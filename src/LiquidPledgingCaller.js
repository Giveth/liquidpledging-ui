import LiquidPledging from './LiquidPledgingState'
import { Currency } from './Styles';

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
       let donate = LiquidPledging.donate(data.emiterId, data.recieverId, data.amount, data.address )
       .then((data) => {

            console.log("Donated", data)
            LiquidPledging.retriveStateData()
            this.emit(this.SHOW_NOTIFICATION,{
                message: 'Funds added!',
                action:'View TX',
                onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
            }) 

        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })

        console.log(donate)

        this.emit(this.SHOW_NOTIFICATION, {message:'Adding funds. Waiting confirmation...', action:'View', })
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
            this.emit(this.SHOW_NOTIFICATION,{
                message: 'Funds delegated!',
                action:'View TX',
                onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
            }) 

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
            this.emit(this.SHOW_NOTIFICATION,{
                message: 'Funds delegated!',
                action:'View TX',
                onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
            }) 

        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })
        this.emit(this.SHOW_NOTIFICATION, {message: 'Delegating funds. Waiting confirmation...'})

    }

    //CANCEL
    showCancelDialog(data)
    {
        console.log(data)
        let delegation = data.delegation
        let node = data.node

        if(delegation.delegations.length === 0)
        {
            let data = {
                emiterId:node.id,
                pledgeId:delegation.pledgeId,
                recieverId: node.id,
                //amount: delegation.assignedAmount,
                amount: delegation.assignedAmount - 1000, 
                address: node.adminAddress
            }
    
            this.cancel(data)
        }
        else
        {
            let pledgeAmounts = []

            let getCancelPledgesRecursively=(d)=>
            {
                let data = {
                    amount: d.assignedAmount - 1000, 
                    id: d.pledgeId
                }

                
                d.delegations.forEach((delegationId)=>{
                    getCancelPledgesRecursively(LiquidPledging.getDelegation(delegationId))
                })
                
                pledgeAmounts.push(data)
            }

            getCancelPledgesRecursively(delegation)

            let data = {
                emiterId:node.id,
                pledgeAmounts:pledgeAmounts,
                recieverId: node.id,
                address: node.adminAddress
            }

            console.log("multi!", data)
            this.multiCancel(data)
        }
    }
    
    cancel(data)
    {
        console.log(data)
        LiquidPledging.transfer(data.emiterId, data.pledgeId, data.recieverId, data.amount, data.address)
        .then((data) => {
            console.log("Canceled", data)
            LiquidPledging.retriveStateData()
            this.emit(this.SHOW_NOTIFICATION,{
                message: 'Delegation canceled!',
                action:'View TX',
                onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
            }) 
        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })

        this.emit(this.SHOW_NOTIFICATION, {message: 'Canceling delegation. Waiting confirmation...'})
    }

    multiCancel(data)
    {
        LiquidPledging.multiTransfer(data.emiterId, data.pledgeAmounts, data.recieverId, data.address)
        .then((data) => {
            console.log("MultiCanceled", data)
            LiquidPledging.retriveStateData()
            this.emit(this.SHOW_NOTIFICATION,{
                message: 'Delegation canceled',
                action:'View TX',
                onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
            }) 
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
               this.emit(this.SHOW_NOTIFICATION,{
                message: 'New Giver created',
                action:'View TX',
                onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
            }) 

            }).catch((error)=>{
                this.showTransactionError()
                console.error(error)
            })


        else if(data.type==="Delegate")
            LiquidPledging.addDelegate(data.name, data.url, data.address).then((data) => {
                console.log("Delgate added", data)
                LiquidPledging.retriveStateData()
                this.emit(this.SHOW_NOTIFICATION,{
                    message: 'New Delegate created',
                    action:'View TX',
                    onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
                }) 

            }).catch((error)=>{
                this.showTransactionError()
                console.error(error)
            })

        else if(data.type==="Project")
            LiquidPledging.addProject(data.name, data.url, data.address).then((data) => {
                console.log("Project added", data)
                LiquidPledging.retriveStateData()
                this.emit(this.SHOW_NOTIFICATION,{
                    message: 'New Project created',
                    action:'View TX',
                    onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
                }) 

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

        if(network.name.toLowerCase()==='unknown')
            return
            
        if(network.id === 1)
            return 'https://etherscan.io/tx/'+transactionId

        else
            return 'https://'+network.name.toLowerCase()+'.etherscan.io/tx/'+transactionId
    }

    goToUrl(url)
    {
        if(!url)
            return
            
        let win = window.open(url, '_blank');
        win.focus();
    }
}

const instance = new Caller()

export default instance;