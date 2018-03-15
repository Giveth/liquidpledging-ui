import React, { Component } from 'react'
import Caller from './LiquidPledgingCaller'
import LPState from "./LiquidPledgingState.js"

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

            transferOpen:false,
            transferData:{reciever:0, emiterId:0, amount:0, giverName:''},
            transferMetadata:{emiters:[]},

            addAdminOpen:false,
            addAdminData:{defaultAdminType:0},
            addAdminMetadata:{emiters:[]},

            pledgesOpen:false,
            pledgesData:{},
            pledgesMetadata:{emiters:[]},

            findDelegationsOpen:false,
            findDelegationsData:{},
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)


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

    onTransferDone=(data)=>
    {
        this.setState({  transferOpen:false })
        Caller.transfer(data)
    }

    onMultiTransferDone=(data)=>
    {
        this.setState({  transferOpen:false })
        Caller.multiTransfer(data)
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

        let donateDialog = <div/>
        let transferDialog = <div/>
        let addAminDialog = <div/>
        let pledgesDialog = <div/>
        let findDelegationsDialog = <div/>

        if(this.state.donateOpen)
            donateDialog = (
            <DonateDialog
                open={this.state.donateOpen}
                onCancel ={this.donateOnCancel}
                onDone ={this.donateOnDone}
                data={this.state.donateData}/>)

        if(this.state.transferOpen)
            transferDialog = (
                <TransferDialog
                    open={this.state.transferOpen}
                    onCancel ={this.transferOnCancel}
                    onTransferDone ={this.onTransferDone}
                    onMultiTransferDone ={this.onMultiTransferDone}
                    data={this.state.transferData}
                    meta={this.state.transferMetadata}
                    currentAddress={this.state.currentAddress}/>)

        if(this.state.addAdminOpen)
            addAminDialog =(
                    <AddAdminDialog
                    open={this.state.addAdminOpen}
                    onCancel ={this.addAdminOnCancel}
                    onDone ={this.addAdminOnDone}
                    data={this.state.addAdminData}/>)

        if(this.state.pledgesOpen)
            pledgesDialog = (
                <PledgesDialog
                    open={this.state.pledgesOpen}
                    onCancel ={this.pledgesOnCancel}
                    data={this.state.pledgesData}/>
            )

        if(this.state.findDelegationsOpen)
            findDelegationsDialog = (
                <FindDelegationsDialog
                    open={this.state.findDelegationsOpen}
                    onCancel ={this.findDelegationsOnCancel}
                    data={this.state.findDelegationsData}/>
            )
        
        return (
            <div>
                {donateDialog}
                {transferDialog}
                {addAminDialog}
                {pledgesDialog}
                {findDelegationsDialog}
            </div>
        )
    }
}

export default Dialogs

