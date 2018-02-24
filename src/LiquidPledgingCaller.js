import {Currency} from './Styles'
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
        this.ADD_ADMIN_DIALOG = 'addAdmin'
        this.PLEDGES = 'pledges'
        this.FIND_DELEGATIONS = 'findDelegations'
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

    multiTransfer(data)
    {
       LiquidPledging.multiTransfer(data.emiterId, data.pledgeAmounts, data.recieverId)
       .then((data) => {
            console.log("Multi Transfered", data)
            LiquidPledging.retriveStateData()
        }).catch((error)=>console.error(error))
    }

    //CANCEL
    showCancelDialog(delegation)
    {
        console.log(delegation)

        if(delegation.delegations.length === 0)
        {
            console.log("Single!")
            let data = {
                pledgeId:delegation.pledgeId,
                amount:delegation.assignedAmount
            }
    
            this.cancel(data)
        }
        else
        {
            let pledgeAmounts = []

            let getCancelPledgesRecursively=(d)=>
            {
                d.delegations.forEach((delegationId)=>{
                    getCancelPledgesRecursively(LiquidPledging.getDelegation(delegationId))
                })

                let data = {
                    pledgeId:d.pledgeId,
                    amount:d.assignedAmount
                }

                pledgeAmounts.push(data)

            }

            getCancelPledgesRecursively(delegation)

            console.log("multi!", pledgeAmounts)
        }
    }

    

    cancel(data)
    {
        LiquidPledging.cancel(data.pledgeId, data.amount)
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

    //Find Delegations
    showFindDelegationsDialog(data)
    {
        this.emit(this.FIND_DELEGATIONS,data)
    }
}

const instance = new Caller()

export default instance;