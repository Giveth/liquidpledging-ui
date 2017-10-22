import LiquidPledging from './LiquidPledgingState'
import {Currency} from './Styles'

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
        }).catch((error)=>console.error(error))
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
        }).catch((error)=>console.error(error))
    }

    //CANCEL
    showCancelDialog(currentDelegation)
    {
        let delegation = LiquidPledging.getDelegation(currentDelegation.parentId)
        console.log(currentDelegation, delegation)

        let data = {
            emiterId:delegation.parentAdminId,
            pledgeId:currentDelegation.pledgeId,
            recieverId:delegation.parentAdminId,
            amount:Currency.toEther(currentDelegation.assignedAmount)
        }

        this.cancel(data)
    }

    cancel(data)
    {

        LiquidPledging.cancel(data.emiterId, data.pledgeId, data.recieverId, data.amount)
        .then((data) => {
            console.log("Canceled", data)
        }).catch((error)=>console.error(error))
    }
}

const instance = new Caller()

export default instance;