import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"

class LPStateTest extends Component {

    constructor(){
        super()

        this.state={
            data:['{}'],
            network:"",
            account:""
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{
        let newState = LPState.getState()
        let str = JSON.stringify(newState,null,2)
        this.setState({data:str})
    }

    onAccountChanged=()=>{
        let newAccount = LPState.getCurrentAccount()
        this.setState({account:newAccount})
    }

    onNetworkChanged=()=>{
        let newNetwork = LPState.getCurrentNetwork().name
        this.setState({network:newNetwork})
    }

    render() {
        return (
            <div >
                <pre key = {"data"} style ={{wordWrap: 'break-word'}}> {this.state.data} </pre>
                <h1 key = {"account"} style ={{wordWrap: 'break-word'}}> {this.state.account} </h1>
                <h1 key = {"network"} style ={{wordWrap: 'break-word'}}> {this.state.network} </h1>
            </div>
        )
    }
}

export default LPStateTest
