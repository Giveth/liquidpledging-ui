import ProviderHelper from "./Web3ProviderHelper"

const liquidpledging = require('liquidpledging');
const LiquidPledging = liquidpledging.LiquidPledging;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;
const EventEmitter = require('events')

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

        setInterval(()=>{
            console.log("S")
            this.retriveStateData()
        }, 3000);
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
        this.emit(this.STATE_CHANGED)
    }

    getState(){
        return this.state
    }
}

export default LiquidPledgingController
