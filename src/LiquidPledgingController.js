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
        this.data = []
        this.interval = {}
        this.startInterval()
        this.STATE_CHANGED = "stateChanged"
        this.setupWeb3()
        const liquidPledging = new LiquidPledging(web3, '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24');
        this.liquidPledgingState = new LiquidPledgingState(liquidPledging);
        web3.eth.filter("latest", (error, result) => {
/*            liquidPledgingState.getState().then(st => {
                this.data.st = st;
                this.emit(this.STATE_CHANGED);
            }) */
            this.data.st = result;
            this.emit(this.STATE_CHANGED);
        });
    }

    setupWeb3(){
        this.setup(["*", httpProvider]).then(()=>{

            }).catch((e)=>{console.error(e)})
        }

    getData(){
        return this.data
    }
}

export default new LiquidPledgingController()
