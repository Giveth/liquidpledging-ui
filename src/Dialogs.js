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
            transferMetadata:{givers:[]}
        }

        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)

        Caller.on(Caller.DONATE_DIALOG, this.donateOnShow)
        Caller.on(Caller.TRANSFER_DIALOG, this.transferOnShow)
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

    donateOnDone=(donateData)=>
    {
        this.setState({ donateOpen:false })
        Caller.donate(donateData)
    }

    //Transfer
    transferOnShow=(data)=>
    {
        let givers = []// LPState.getGivers()
        let transferMetadata={}
        transferMetadata.givers=givers
        this.setState({ transferData:data, transferOpen:true, transferMetadata:transferMetadata})
    }

    transferOnCancel=()=>
    {
        this.setState({ transferOpen:false })
    }

    transferOnDone=(donateData)=>
    {
        this.setState({  transferOpen:false })

        Caller.donate(donateData)
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
                    data={this.state.transferData}/>

            </div>
        )
    }
}

export default Dialogs

