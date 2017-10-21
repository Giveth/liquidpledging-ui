import LiquidPledging from './LiquidPledgingState'
const EventEmitter = require('events')

class Caller extends EventEmitter
{
    constructor()
    {
        super()
        this.DONATE_DIALOG = 'donateDialog'
        this.TRANSFER_DIALOG = 'transferDialog'
    }

    //DONATE
    showDonateDialog(data)
    {
        this.emit(this.DONATE_DIALOG, data)
    }

    donate(data)
    {
       LiquidPledging.donate(data.emiter, data.reciever, data.amount )
       .then((data) => {
            console.log("Donated", data)
        })
    }

    //TRANSFER
    showTransferDialog(data)
    {
        this.emit(this.TRANSFER_DIALOG, data)
    }

    transfer(data)
    {
        LiquidPledging.transfer(data.giverId, data.pledgeId, data.receiverId, data.amount)
       .then((data) => {
            console.log("Donated", data)
        })
    }



}

const instance = new Caller()

export default instance;