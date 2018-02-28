import ProviderHelper from './Web3ProviderHelper'
import Formatter from './DataFormatter'

const liquidpledging = require('./liquidpledging');
const LiquidPledging = liquidpledging.LiquidPledging;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;
const testRPCProvider = 'ws://localhost:8546'
const liquidPledgingContractAddress = '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24' //TESTRPC DETERMINISTIC
//const liquidPledgingContractAddress = '0x18658A1A7cB8b0Be97b155D051769b3651b2943c' //ROPSTEN

class LiquidPledgingController extends ProviderHelper {

    constructor()
    {
        super()
        this.STATE_CHANGED = "stateChanged"
        this.NO_CONTRACT = "noContract"

        this.liquidpledging={}
        this.liquidPledgingState={}
        
        this.admins=[]
        this.pledges=[]
        this.delegations={}
        this.delegationsArray=[]
        this.nodes=[]

        this.setupWeb3()
    }

    setupWeb3(){
        this.setup([testRPCProvider, '*', testRPCProvider]).then(()=>{

            this.setupLiquidPledging()

        }).catch((e)=>{console.error(e)})
    }

    setupLiquidPledging()
    {this.data = {}
        this.liquidPledging = new LiquidPledging(this.web3, liquidPledgingContractAddress);
        this.liquidPledgingState = new LiquidPledgingState(this.liquidPledging);

        this.web3.eth.subscribe('newBlockHeaders',(err,block)=>
        {
            if (err) {
                console.error("ERROR", err);
            } else {
                //console.log("block: " + block.number )
                this.retriveStateData()
            }
        })   

        //TODO: This needs to be gone. It is just because some providers don't support the subscribe method yet
        setInterval(()=>{
            this.retriveStateData()
        },10000) 
        
        this.retriveStateData()
    }

    retriveStateData()
    {
        this.liquidPledgingState.getState()
            .then((data) => {
                this.setState(data)
            })
            .catch((error)=>{
                this.emit(this.NO_CONTRACT)
                console.error("Retrive state error", error)
            })
    }

    setState(data)
    {
        //TODO: Only update if there is the state changed

        console.log("New state")
        
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
            this.delegations = Formatter.createDelegations(this.pledges, this.admins)
            this.delegationsArray = Formatter.getDelegationsArray(this.delegations)
            this.nodes = Formatter.setNodes(this.nodes, this.delegations)
        }
        else
        {
            this.pledges=[]
        }

        this.emit(this.STATE_CHANGED)
    }

    //GET

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

    getNode(adminId)
    {
        return this.nodes[adminId]
    }

    getPledge(pledgeId)
    {
        return this.pledges[pledgeId]
    }

    //SET

    donate(emiterId, receiverId, amount )
    {
        let weiAmount =this.web3.utils.toWei(amount.toString())
        return this.liquidPledging.donate(emiterId, receiverId, { from: this.currentAccount, value:weiAmount})
    }

    transfer(emiterId, pledgeId, receiverId, amount, address )
    {
        return this.liquidPledging.transfer(emiterId, pledgeId, amount.toString(), receiverId, {from: address })
    }

    multiTransfer(emiterId, pledgesAmounts, receiverId, address )
    {
        let encodedPledges = pledgesAmounts.map(p => {
            return '0x' + this.web3.utils.padLeft(this.web3.utils.toHex(p.amount).substring(2), 48) + this.web3.utils.padLeft(this.web3.utils.toHex(p.id).substring(2), 16);
        })

        return this.liquidPledging.mTransfer(emiterId, encodedPledges, receiverId, {from: address })
    }

    cancel(pledgeId, amount)
    {
        return this.liquidPledging.cancelPledge(pledgeId, amount, {from:this.currentAccount, gas:500000})
    }

    multiCancel(pledgesAmounts )
    {
        let encodedPledges = pledgesAmounts.map(p => {
            return '0x' + this.web3.utils.padLeft(this.web3.utils.toHex(p.amount).substring(2), 48) + this.web3.utils.padLeft(this.web3.utils.toHex(p.id).substring(2), 16);
        })

        return this.liquidPledging.mCancelPayment( encodedPledges, {from: this.currentAccount })
    }
    

    addGiver(name, url)
    {
        //return this.liquidPledging.addGiver('UngaGiver', 'ungaurl', 600, 0, { from: this.currentAccount }); //#A1 
       return this.liquidPledging.addGiver(name, url, 600, 0, { from: this.currentAccount })
    }

    addDelegate(name, url)
    {
        return this.liquidPledging.addDelegate(name, url, 600, 0, { from: this.currentAccount })
    }

    addProject(name, url)
    {
        return this.liquidPledging.addProject(name, url, this.currentAccount, 0, 86400, 0, { from: this.currentAccount })
    }
}

export default LiquidPledgingController
