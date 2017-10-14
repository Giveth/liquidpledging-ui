import ProviderHelper from "./Web3ProviderHelper"

const liquidpledging = require('liquidpledging');

const LiquidPledging = liquidpledging.LiquidPledging;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;

LiquidPledgingState

const EventEmitter = require('events')
const httpProvider = 'http://localhost:8545'

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
        this.setup([httpProvider]).then(()=>{

            this.setupLiquidPledging()

        }).catch((e)=>{console.error(e)})
    }

    setupLiquidPledging()
    {
        const liquidPledging = new LiquidPledging(this.web3, '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24');
        this.liquidPledgingState = new LiquidPledgingState(liquidPledging);

        setInterval(()=>
        {
            this.liquidPledgingState.getState().then(state => {
            this.state = state;
            this.emit(this.STATE_CHANGED);

        }, 5000)});
    }

    getState(){
        return this.state
    }
}

export default new LiquidPledgingController()
