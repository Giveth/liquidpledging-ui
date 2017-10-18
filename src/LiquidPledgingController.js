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
                this.setState(data)
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
            this.state.pledges=this.setRightTypes(this.state.pledges)

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
    setRightTypes(pledges)
    {
        return pledges.map((pledge, index)=>{

            pledge.commitTime=parseInt(pledge.commitTime,10)
            pledge.intendedProject=parseInt(pledge.intendedProject,10)
            pledge.oldPledge=parseInt(pledge.oldPledge,10)
            //pledge.amount=parseInt(pledge.amount,10) //it may give problems with bigNumber
            pledge.owner=parseInt(pledge.owner,10)

            pledge.delegates = pledge.delegates.map((delegate,index)=>{
                 return delegate.id=parseInt(delegate.id,10)
            })

            return pledge
            
        })
    }


    createDelegations(pledges)
    {
        let delegationsArray = []

        //lets create unique identifier for each pledge. And let's add al convinient data. 
        for (let i = pledges.length - 1; i >= 0; --i) {

            let pledge = pledges[i]
            let id = this.getDelegationId(pledge.owner, pledge.delegates)
            let parentDelegates = pledge.delegates.slice()
            parentDelegates.splice(-1,1)
            let parentId = this.getDelegationId(pledge.owner, parentDelegates)
            let adminId =  pledge.delegates[pledge.delegates.length-1]

            let delegation={
                id:id,
                parentId:parentId,
                delegations:[],
                assignedAmount:0,
                pledgeId:pledge.id,
                intendedProject:pledge.intendedProject,
                adminId:adminId
            }
            
            delegationsArray.push(delegation)
        }

        let delegations = {}
        //we go over the just created delegations and assign them their child delegations
        for(let i = 0; i < delegationsArray.length; i++)
        {
            let current = delegationsArray[i]

            for(let j= 0; j < delegationsArray.length - i - 1; j++) //current minus self
            {
                if( current.parentId === delegationsArray[j].id)
                {
                    delegationsArray[j].delegations.push(current.id)
                    //TODO: add up amount
                    break //there is only one parent
                }
            }
           
            delegations[current.id] = current
        }

        console.log(delegations)
    }

    //returns an string made of all delegations. including the owner at the begining and the project at the end (if it exists)
    getDelegationId(owner, delegates)
    {
        let delegatesChain = [owner]
        delegatesChain = delegatesChain.concat(delegates)
        return delegatesChain.toString()
    }

}



export default LiquidPledgingController
