import ProviderHelper from './Web3ProviderHelper'
import Formatter from './DataFormatter'

const liquidpledging = require('liquidpledging');
const LiquidPledging = liquidpledging.LiquidPledging;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;
const testRPCProvider = 'ws://localhost:8546'
const liquidPledgingContractAddress = '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24'

class LiquidPledgingController extends ProviderHelper {

    constructor()
    {
        super()
        this.STATE_CHANGED = "stateChanged"
        
        this.admins=[]
        this.pledges=[]
        this.delegations={}
        this.nodes={}

        this.setupWeb3()
    }

    setupWeb3(){
        this.setup([testRPCProvider]).then(()=>{

            this.setupLiquidPledging()

        }).catch((e)=>{console.error(e)})
    }

    setupLiquidPledging()
    {
        const liquidPledging = new LiquidPledging(this.web3, liquidPledgingContractAddress);
        this.liquidPledgingState = new LiquidPledgingState(liquidPledging);

        
        /*this.web3.eth.subscribe('newBlockHeaders',(err,block)=>
        {
            if (err) {
                console.error("ERROR", err);
            } else {
                //console.log("block: " + block.number )
                this.retriveStateData()
            }
        })
        */

        this.retriveStateData()

        setInterval(()=>{
            this.retriveStateData()
        }, 10000);
    }

    retriveStateData()
    {
        this.liquidPledgingState.getState()
            .then((data) => {
                this.setState(data)
            })
            .catch((error)=>{console.error(error)})
    }

    setState(data)
    {
        this.admins = data.admins
        this.pledges = data.pledges

        if(this.admins)
        {
            this.admins=Formatter.setIds(this.admins)
            this.admins.shift()
            this.nodes = Formatter.initNodes(this.admins)
        }
        else
        {
           this.this.admins=[]            
        }

        if(this.pledges)
        {
            this.pledges=Formatter.setIds(this.pledges)
            this.pledges.shift() //first item is always null
            this.pledges=Formatter.setRightTypes(this.pledges)
            this.delegations = Formatter.createDelegations(this.pledges)
            this.nodes = Formatter.setNodes(this.nodes, this.delegations)
        }
        else
        {
            this.pledges=[]
        }

        this.emit(this.STATE_CHANGED)
    }

    getDelegation(delegationId)
    {
        return this.delegations[delegationId]
    }

    getAdmin(adminId)
    {
        if( adminId > this.admins.length )
            return {}
        return this.admins[adminId-1]
    }

    donate(giverId, receiverId, amount )
    {
        this.liquidPledging.donate(giverId, receiverId, { from: this.currentAccount, value: this.web3.utils.toWei(amount) }).then((data) => {
                console.log("Donated", data)
            })
    }
}

export default LiquidPledgingController
