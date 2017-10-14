import ProviderHelper from "./Web3ProviderHelper"

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
    }

    startInterval()
    {
        this.interval=setInterval(() => {
            for (let i=0; i<10; i += 1) {
                this.data[i] = Math.floor(Math.random() * 10);
            }

            this.emit(this.STATE_CHANGED)

        }, 1000)
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
