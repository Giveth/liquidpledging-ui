import React, { Component } from 'react'
import Caller from './LiquidPledgingCaller'
import DonateDialog from './DonateDialog'
import TransferDialog from './TransferDialog'
import LPState from "./LiquidPledgingState.js"

class Dialogs extends Component {

    constructor()
    {
        super() 
        this.state={
            currentAddress:'',
            donateOpen:false,
            donateData:{reciever:0, emiter:0, amount:0, giverName:'unga'},
            transferOpen:false,
            transferData:{reciever:0, emiter:0, amount:0, giverName:'unga'},
            transferMetadata:{emiters:[]}
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)

        Caller.on(Caller.DONATE_DIALOG, this.donateOnShow)
        Caller.on(Caller.TRANSFER_DIALOG, this.transferOnShow)
    }

    onStateChanged=()=>{

        let emiters = LPState.getDelegations(this.state.currentAddress)
        let transferMetadata={}
        transferMetadata.emiters=emiters
        this.setState({ transferMetadata:transferMetadata})
    }

    onAccountChanged=()=>{
        this.setState({ currentAddress:LPState.getCurrentAccount()})
    }

    onNetworkChanged=()=>{
        //let newNetwork = LPState.getCurrentNetwork().name
        //this.setState({network:newNetwork})
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

    render() {
        return (
            <div>            
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

            </div>
        )
    }
}

export default Dialogs

