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
        this.SHOW_NOTIFICATION = 'show_notification'
        this.CLOSE_NOTIFICATION ='close_notification'
    }

    //DONATE
    showDonateDialog(data)
    {
        this.emit(this.DONATE_DIALOG, data)
    }

    donate(data)
    {
       LiquidPledging.donate(data.emiterId, data.recieverId, data.amount, data.address )
       .then((data) => {

            console.log("Donated", data)
            LiquidPledging.retriveStateData()
            this.emit(this.SHOW_NOTIFICATION, {message: 'Funds added!'}) 

        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })

        this.generateTransactionUrl()
        this.emit(this.SHOW_NOTIFICATION, {message:'Adding funds. Waiting confirmation...'})
    }

    //TRANSFER
    showTransferDialog(data)
    {
        this.emit(this.TRANSFER_DIALOG, data)
    }

    transfer(data)
    {
       LiquidPledging.transfer(data.emiterId, data.pledgeId, data.recieverId, data.amount, data.address)
       .then((data) => {
            console.log("Transfered", data)
            LiquidPledging.retriveStateData()
            this.emit(this.SHOW_NOTIFICATION, {message: 'Funds delegated!'})

        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })

        this.emit(this.SHOW_NOTIFICATION, {message: 'Delegating funds. Waiting confirmation...'})

    }

    multiTransfer(data)
    {
       LiquidPledging.multiTransfer(data.emiterId, data.pledgeAmounts, data.recieverId, data.address)
       .then((data) => {
            console.log("Multi Transfered", data)
            LiquidPledging.retriveStateData()
            this.emit(this.SHOW_NOTIFICATION, {message: 'Funds delegated'})

        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })
        this.emit(this.SHOW_NOTIFICATION, {message: 'Delegating funds. Waiting confirmation...'})

    }

    //CANCEL
    showCancelDialog(delegation)
    {
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
                let data = {
                    id:d.pledgeId,
                    amount:d.assignedAmount
                }

                pledgeAmounts.push(data)

                d.delegations.forEach((delegationId)=>{
                    getCancelPledgesRecursively(LiquidPledging.getDelegation(delegationId))
                })
            }

            getCancelPledgesRecursively(delegation)

            console.log("multi!", pledgeAmounts)
            this.multiCancel(pledgeAmounts)
        }
    }

    cancel(data)
    {
        LiquidPledging.cancel(data.pledgeId, data.amount)
        .then((data) => {
            console.log("Canceled", data)
            LiquidPledging.retriveStateData()
            this.emit(this.SHOW_NOTIFICATION, {message: 'Delegation canceled'})

        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })

        this.emit(this.SHOW_NOTIFICATION, {message: 'Canceling delegation. Waiting confirmation...'})

    }

    multiCancel(pledgeAmounts)
    {
        LiquidPledging.multiCancel(pledgeAmounts)
        .then((data) => {
            console.log("MultiCanceled", data)
            LiquidPledging.retriveStateData()
            this.emit(this.SHOW_NOTIFICATION, {message: 'Delegation canceled'})

        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })
        this.emit(this.SHOW_NOTIFICATION, {message: 'Canceling delegation. Waiting confirmation...'})

    }

     //AddAdmin
    showAddAdminDialog(data)
    {
        this.emit(this.ADD_ADMIN_DIALOG, data)
    }

    addAdmin(data)
    {
        if(data.type==="Giver")
            LiquidPledging.addGiver(data.name, data.url, data.address).then((data) => {
                console.log("Giver added", data, LiquidPledging.admins)
                LiquidPledging.retriveStateData()
                this.emit(this.SHOW_NOTIFICATION, {message: 'New Giver   created'})

            }).catch((error)=>{
                this.showTransactionError()
                console.error(error)
            })


        else if(data.type==="Delegate")
            LiquidPledging.addDelegate(data.name, data.url, data.address).then((data) => {
                console.log("Delgate added", data)
                LiquidPledging.retriveStateData()
                this.emit(this.SHOW_NOTIFICATION, {message: 'New Delegate created'})

            }).catch((error)=>{
                this.showTransactionError()
                console.error(error)
            })


        else if(data.type==="Project")
            LiquidPledging.addProject(data.name, data.url, data.address).then((data) => {
                console.log("Project added", data)
                LiquidPledging.retriveStateData()
                this.emit(this.SHOW_NOTIFICATION, {message: 'New Project created'})

            }).catch((error)=>{
                this.showTransactionError()
                console.error(error)
            })
            

            this.emit(this.SHOW_NOTIFICATION, {message: 'Creating new '+data.type})
    }

    showTransactionError()
    {
        this.emit(this.SHOW_NOTIFICATION, {message: 'Ops! Something when wrong...'})
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

    showNotification(data)
    {
        this.emit(this.SHOW_NOTIFICATION, data)
    }
    
    closeNotification(data)
    {
        this.emit(this.CLOSE_NOTIFICATION, data)
    }

    generateTransactionUrl(transactionId)
    {
        let network = LiquidPledging.getNetworkDetails(LiquidPledging.getCurrentNetwork())

        if(!network.id)
            return
            
        if(network.id === 1)
            return 'https://etherscan.io/tx/'+transactionId

        else
            return 'https://'+network.name+'.etherscan.io/tx/'+transactionId

    }
}

const instance = new Caller()

export default instance;