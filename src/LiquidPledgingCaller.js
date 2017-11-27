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
        this.ADD_ADMIN_DIALOG = 'addAdmin'
        this.PLEDGES = 'pledges'
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
            LiquidPledging.retriveStateData()
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
            LiquidPledging.retriveStateData()
        }).catch((error)=>console.error(error))
    }

    //CANCEL
    showCancelDialog(currentDelegation)
    {
        let delegation = LiquidPledging.getDelegation(currentDelegation.parentId)
        console.log(currentDelegation, delegation)

        let data = {
            emiterId:currentDelegation.adminId,
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
            LiquidPledging.retriveStateData()
        }).catch((error)=>console.error(error))
    }

     //AddAdmin
    showAddAdminDialog(data)
    {
        this.emit(this.ADD_ADMIN_DIALOG, data)
    }

    addAdmin(data)
    {
        if(data.type==="Giver")
            LiquidPledging.addGiver(data.name, data.url).then((data) => {
                console.log("Giver added", data, LiquidPledging.admins)
                LiquidPledging.retriveStateData()
            }).catch((error)=>console.error(error))


        else if(data.type==="Delegate")
            LiquidPledging.addDelegate(data.name, data.url).then((data) => {
                console.log("Delgate added", data)
                LiquidPledging.retriveStateData()
            }).catch((error)=>console.error(error))


        else if(data.type==="Project")
            LiquidPledging.addProject(data.name, data.url).then((data) => {
                console.log("Project added", data)
                LiquidPledging.retriveStateData()
            }).catch((error)=>console.error(error))
    }
    //Pledges

    showPledgesDialog(data)
    {
        this.emit(this.PLEDGES,data)
    }
}

const instance = new Caller()

export default instance;