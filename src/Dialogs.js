import React, { Component } from 'react'
import Caller from './LiquidPledgingCaller'
import LPState from "./LiquidPledgingState.js"
import Snackbar from 'material-ui/Snackbar'

import DonateDialog from './DonateDialog'
import TransferDialog from './TransferDialog'
import AddAdminDialog from './AddAdminDialog'
import PledgesDialog from './PledgesDialog'
import FindDelegationsDialog from './FindDelegationsDialog'

class Dialogs extends Component {

    constructor()
    {
        super() 
        this.state={
            currentAddress:'',
            donateOpen:false,
            donateData:{reciever:0, emiter:0, amount:0, giverName:''},

            snackbarOpen:false,
            snackbarMessage:'',
            snackBarTime:6000,

            transferOpen:false,
            transferData:{reciever:0, emiter:0, amount:0, giverName:''},
            transferMetadata:{emiters:[]},

            addAdminOpen:false,
            addAdminData:{defaultAdminType:0},
            addAdminMetadata:{emiters:[]},

            pledgesOpen:false,
            pledgesData:{},
            pledgesMetadata:{emiters:[]},

            findDelegationsOpen:false,
            findDelegationsData:{},
            findDelegationsMetadata:{emiters:[]}
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
        LPState.on(LPState.NO_CONTRACT, this.onNoContractFound)

        Caller.on(Caller.DONATE_DIALOG, this.donateOnShow)
        Caller.on(Caller.TRANSFER_DIALOG, this.transferOnShow)
        Caller.on(Caller.ADD_ADMIN_DIALOG, this.addAdminOnShow)
        Caller.on(Caller.PLEDGES, this.pledgesOnShow)
        Caller.on(Caller.FIND_DELEGATIONS, this.findDelegationsOnShow)
    }

    onStateChanged=()=>{

        let emiters = LPState.getDelegationsByAddress(this.state.currentAddress)
        let transferMetadata={}
        transferMetadata.emiters=emiters
        this.setState({ transferMetadata:transferMetadata})
    }

    onAccountChanged=()=>{
        this.setState({ currentAddress:LPState.getCurrentAccount()})
    }

    onNetworkChanged=()=>{
        this.showSnackbar("Connected to " + LPState.getCurrentNetwork().name)
    }

    onNoContractFound=()=>{
        this.showSnackbar("⚠️ Can't find the contract")
    }

    //snackBar
    showSnackbar=(message, time=5000)=>
    {
        this.setState({
            snackbarMessage:message,
            snackbarTime:time,
            snackbarOpen:true
        })
    }

    closeSnackbar=()=>
    {
        this.setState({
            snackbarOpen:false,
            snackbarMessage:"",
            snackBarTime:0,
        } )
    }

    snackBarOnDone=(transfer)=>
    {
        this.setState({ snackBarOpen:false })
    }

    //Donate
    donateOnShow=(data)=>
    {
        this.setState({ donateData:data, donateOpen:true})
    }

    donateOnCancel=()=>
    {
        this.setState({  donateOpen:false })
    }

    donateOnDone=(transfer)=>
    {
        this.setState({ donateOpen:false })
        Caller.donate(transfer)
    }

    //Transfer
    transferOnShow=(data)=>
    {
        this.setState({ transferData:data, transferOpen:true})
    }

    transferOnCancel=()=>
    {
        this.setState({ transferOpen:false })
    }

    transferOnDone=(data)=>
    {
        this.setState({  transferOpen:false })
        Caller.transfer(data)
    }

    //AddAdmin
    addAdminOnShow=(data)=>
    {
        this.setState({ addAdminData:data, addAdminOpen:true})
    }

    addAdminOnCancel=()=>
    {
        this.setState({ addAdminOpen:false })
    }

    addAdminOnDone=(data)=>
    {
        this.setState({  addAdminOpen:false })
        Caller.addAdmin(data)
    }

    //Pledges
    pledgesOnShow=(data)=>
    {
        this.setState({ pledgesData:data, pledgesOpen:true})
    }

    pledgesOnCancel=()=>
    {
        this.setState({ pledgesOpen:false })
    }

     //Pledges
    findDelegationsOnShow=(data)=>
    {
        this.setState({ findDelegationsData:data, findDelegationsOpen:true})
    }

    findDelegationsOnCancel=()=>
    {
        this.setState({ findDelegationsOpen:false })
    }

    render() {
        
        return (
            <div>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    action="Ok"
                    autoHideDuration={this.state.snackBarTime}
                    onActionTouchTap={this.closeSnackbar}
                    onRequestClose={this.closeSnackbar}
                    />

                <DonateDialog
                    open={this.state.donateOpen}
                    onCancel ={this.donateOnCancel}
                    onDone ={this.donateOnDone}
                    data={this.state.donateData}/>

                <TransferDialog
                    open={this.state.transferOpen}
                    onCancel ={this.transferOnCancel}
                    onDone ={this.transferOnDone}
                    data={this.state.transferData}
                    meta={this.state.transferMetadata}/>

                <AddAdminDialog
                    open={this.state.addAdminOpen}
                    onCancel ={this.addAdminOnCancel}
                    onDone ={this.addAdminOnDone}
                    data={this.state.addAdminData}/>

                 <PledgesDialog
                    open={this.state.pledgesOpen}
                    onCancel ={this.pledgesOnCancel}
                    data={this.state.pledgesData}/>
                
                <FindDelegationsDialog
                    open={this.state.findDelegationsOpen}
                    onCancel ={this.findDelegationsOnCancel}
                    data={this.state.findDelegationsData}/>

            </div>
        )
    }
}

export default Dialogs

