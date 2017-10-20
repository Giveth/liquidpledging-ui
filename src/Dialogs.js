import React, { Component } from 'react'
import Caller from './LiquidPledgingCaller'
import DonateDialog from './DonateDialog'
import LPState from "./LiquidPledgingState.js"

class Dialogs extends Component {

    constructor()
    {
        super() 
        this.state={
            donateOpen:false,
            donateData:{reciever:0, emiter:0, amount:0, giverName:'unga'}
        }

        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)

        Caller.on(Caller.DONATE_DIALOG, this.onShowDonate)
    }

    onAccountChanged=()=>{
        let newAccount = LPState.getCurrentAccount()
    }

    onNetworkChanged=()=>{
        //let newNetwork = LPState.getCurrentNetwork().name
        //this.setState({network:newNetwork})
    }

    onShowDonate=(data)=>
    {
        this.setState({
            donateData:data,
            donateOpen:true
        })
    }

    donateOnCancel=()=>
    {
        this.setState({
            donateOpen:false
        })
    }

    donateOnDone=(donateData)=>
    {
        this.setState({

            donateOpen:false
        })

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

            </div>
        )
    }
}

export default Dialogs

