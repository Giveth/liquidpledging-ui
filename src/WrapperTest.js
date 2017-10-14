import React, { Component } from 'react'
import LPController from "./LiquidPledgingController.js"

class LPControllerTest extends Component {

    constructor(){
        super()

        this.state={
            data:[],
            network:"",
            account:""
        }

        LPController.on(LPController.STATE_CHANGED, this.onStateChanged)
        LPController.on(LPController.ACCOUNT_CHANGED, this.onAccountChanged)
        LPController.on(LPController.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{
        let newState = LPController.getState().toString()
        this.setState({data:newState.toString()})
    }

    onAccountChanged=()=>{
        let newAccount = LPController.getCurrentAccount()
        this.setState({account:newAccount})
    }

    onNetworkChanged=()=>{
        let newNetwork = LPController.getCurrentNetwork().name
        console.log(newNetwork)
        this.setState({network:newNetwork})
    }

    render() {
        return (
            <div >
                <h1 key = {"data"} style ={{wordWrap: 'break-word'}}> {this.state.data} </h1>
                <h1 key = {"account"} style ={{wordWrap: 'break-word'}}> {this.state.account} </h1>
                <h1 key = {"network"} style ={{wordWrap: 'break-word'}}> {this.state.network} </h1>
            </div>
        )
    }
}

export default LPControllerTest
