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
        let newState = LPController.getState()
        let str = JSON.stringify(newState,null,2)
        console.log(str)
        this.setState({data:str})
    }

    onAccountChanged=()=>{
        let newAccount = LPController.getCurrentAccount()
        this.setState({account:newAccount})
    }

    onNetworkChanged=()=>{
        let newNetwork = LPController.getCurrentNetwork().name
        this.setState({network:newNetwork})
    }

    render() {
        return (
            <div >
                <p key = {"data"} style ={{wordWrap: 'break-word'}}> <pre>{this.state.data} </pre></p>
                <h1 key = {"account"} style ={{wordWrap: 'break-word'}}> {this.state.account} </h1>
                <h1 key = {"network"} style ={{wordWrap: 'break-word'}}> {this.state.network} </h1>
            </div>
        )
    }
}

export default LPControllerTest
