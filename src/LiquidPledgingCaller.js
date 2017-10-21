import LiquidPledging from './LiquidPledgingState'
const EventEmitter = require('events')

class Caller extends EventEmitter
{
    constructor()
    {
        super()
        this.DONATE_DIALOG = 'donateDialog'
        this.TRANSFER_DIALOG = 'transferDialog'
        this.CANCEL_DIALOG = 'cancelDialog'
    }

    //DONATE
    showDonateDialog(data)
    {
        this.emit(this.DONATE_DIALOG, data)
    }

    donate(data)
    {
       LiquidPledging.donate(data.emiterId, data.recieverId, data.amount )
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
       LiquidPledging.transfer(data.emiterId, data.pledgeId, data.recieverId, data.amount)
       .then((data) => {
            console.log("Transfered", data)
        })
    }

    //CANCEL
    showCancelDialog(delegation)
    {
        console.log(delegation)
        let data = {
            emiterId:delegation.parentAdminId,
            pledgeId:delegation.pledgeId,
            recieverId:delegation.parentAdminId,
            amount:delegation.assignedAmount
        }

        console.log(data)
        //this.emit(this.TRANSFER_DIALOG, data)
        this.cancel(data)
    }

    cancel(data)
    {
        let boostGast = true
       LiquidPledging.transfer(data.emiterId, data.pledgeId, data.recieverId, data.amount, boostGast)
       .then((data) => {
            console.log("Canceled", data)
        })
    }
}

const instance = new Caller()

export default instance;