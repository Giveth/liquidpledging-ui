import LiquidPledging from './LiquidPledgingState'
const EventEmitter = require('events')

class LiquidPledgingCaller extends EventEmitter
{
    constructor()
    {
        super()
    }

    donate(giverId, receiverId, amount )
    {
       LiquidPledging.donate(giverId, receiverId, amount )
       .then((data) => {
            
            console.log("Donated", data)
        })
    }

}

const instance = new LiquidPledgingCaller()

export default instance;