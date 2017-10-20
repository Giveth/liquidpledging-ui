import LiquidPledging from './LiquidPledgingState'
const EventEmitter = require('events')

class Caller extends EventEmitter
{
    constructor()
    {
        super()
        this.DONATE_DIALOG = 'donateDialog'
    }

    showDonateDialog(donateData)
    {
        this.emit(this.DONATE_DIALOG, donateData)
    }

    donate(donateData)
    {
       LiquidPledging.donate(donateData.emiter, donateData.reciever, donateData.amount )
       .then((data) => {
            console.log("Donated", data)
        })
    }

}

const instance = new Caller()

export default instance;