import ProviderHelper from "./Web3ProviderHelper"

const liquidpledging = require('liquidpledging');
const LiquidPledging = liquidpledging.LiquidPledging;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;
//const EventEmitter = require('events')

const testRPCProvider = 'ws://localhost:8546'
const liquidPledgingContractAddress = '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24'

class LiquidPledgingController extends ProviderHelper {

    constructor()
    {
        super()
        this.interval = {}
        this.STATE_CHANGED = "stateChanged"
        this.setupWeb3()
        this.state={} 
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
                this.setFakeState()
            })
            .catch((error)=>{console.error(error)})
    }

    setState(data)
    {
        this.state = data

        if(this.state.pledges)
        {
            this.state.pledges=this.setIds(this.state.pledges)
            this.state.pledges.shift() //first item is always null
            this.state.pledges=this.setStringsToNumbers(this.state.pledges)
            this.delegations = this.createDelegations(this.state.pledges)
        }
        else
            this.state.pledges=[]

        if(this.state.admins)
        {
            this.state.admins=this.setIds(this.state.admins)
            this.state.pledges.shift()
        }
        else
            this.this.state.pledges=[]

        this.emit(this.STATE_CHANGED)
    }

    getState(){
        return this.state
    }

    setIds(array)
    {
       return array.map((item,index)=>{
            if(item)
            {
                item.id=index
                return item
            }
        })
    }
    setStringsToNumbers(pledges)
    {
        return pledges.map((pledge, index)=>{

            pledge.commitTime=parseInt(pledge.commitTime,10)
            pledge.intendedProject=parseInt(pledge.intendedProject,10)
            pledge.oldPledge=parseInt(pledge.oldPledge,10)
            //pledge.amount=parseInt(pledge.amount,10) //it may give problems with bigNumber
            pledge.owner=parseInt(pledge.owner,10)

            pledge.delegates = pledge.delegates.map((delegate,index)=>{
                 delegate.id=parseInt(delegate.id,10)
                 return delegate
            })

            return pledge
            
        })
    }

    createDelegations(pledges)
    {}
}



export default LiquidPledgingController
