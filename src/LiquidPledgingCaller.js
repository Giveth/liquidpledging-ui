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
        this.SHOW_NOTIFICATION = 'showNotification'
        this.CLOSE_NOTIFICATION ='closeNotification'
        this.WITHDRAW_DIALOG = 'withrawDialog'
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
                message: 'Funds delegated',
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
                amount: delegation.assignedAmount,
                address: node.adminAddress
            }
    
            this.cancel(data)
        }
        else
        {
            let cancelCue = []
            let index = 0
            
            let cancelRecursively=(d)=>
            {
                let data = {
                    emiterId:node.id,
                    pledgeId:d.pledgeId,
                    recieverId: node.id,
                    amount: d.assignedAmount,
                    address: node.adminAddress
                }
               
                d.delegations.forEach((delegationId)=>{
                    cancelRecursively(LiquidPledging.getDelegation(delegationId))
                })

                cancelCue.push(()=>{
                    console.log("canceling "+ index)
                    if(index>= cancelCue.length)
                        return
                    index ++
                    this.cancel(data, cancelCue[index], cancelCue.length - index, cancelCue.length)
                })
            }
            cancelRecursively(delegation)
            cancelCue[index]()
        }
    }
    
    cancel(data, onSuccess, index, total)
    {
        let extraGas = 200000
        LiquidPledging.transfer(data.emiterId, data.pledgeId, data.recieverId, data.amount, data.address, extraGas)
        .then((data) => {
            console.log("Canceled", data)
            LiquidPledging.retriveStateData()
            if(onSuccess)
            {
                onSuccess()
                this.emit(this.SHOW_NOTIFICATION,{
                    message: 'Delegation '+ index +'/'+total+' canceled!',
                    action:'View TX',
                    onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
                })
            }
            else
            {
                this.emit(this.SHOW_NOTIFICATION,{
                    message: 'Delegation canceled',
                    action:'View TX',
                    onAction:()=>{this.goToUrl(this.generateTransactionUrl(data.transactionHash))}
                })
            }
            
        }).catch((error)=>{
            this.showTransactionError()
            console.error(error)
        })

        if(onSuccess)
            this.emit(this.SHOW_NOTIFICATION, {message: 'Canceling delegation '+index+'/'+total+'. Waiting confirmation...'})
        else
            this.emit(this.SHOW_NOTIFICATION, {message: 'Canceling delegation. Waiting confirmation...'})

    }

    multiCancel(data)
    {
        let extraGas = 200000
        LiquidPledging.multiTransfer(data.emiterId, data.pledgeAmounts, data.recieverId, data.address, extraGas)
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

    //WITHDRAW
    showWithdrawDialog(data)
    {
        console.log('draw')
        this.emit(this.WITHDRAW_DIALOG,data)
    }

    //NOTIFICATIONS

    showNotification(data)
    {
        this.emit(this.SHOW_NOTIFICATION, data)
    }
    
    closeNotification(data)
    {
        this.emit(this.CLOSE_NOTIFICATION, data)
    }

    //UTILS
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