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

    donate(donateData)
    {
       LiquidPledging.donate(donateData.emiter, donateData.reciever, donateData.amount )
       .then((data) => {
            console.log("Donated", data)
        })
    }

    //TRANSFER
    showTransferDialog(data)
    {
        console.log(data)
        this.emit(this.TRANSFER_DIALOG, data)
    }

    transfer(donateData)
    {
       LiquidPledging.donate(donateData.emiter, donateData.reciever, donateData.amount )
       .then((data) => {
            console.log("Donated", data)
        })
    }



}

const instance = new Caller()

export default instance;