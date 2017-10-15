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
        let filter = {addr:'0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0'}
        let newState = LPState.getAdmins(filter)
        let str = JSON.stringify(newState,null, 2)
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
                <h3 key = {"account"} style ={{wordWrap: 'break-word'}}> {this.state.account} </h3>
                <pre key = {"data"} style ={{wordWrap: 'break-word'}}> {this.state.data} </pre>
            
            </div>
        )
    }
}

export default LPStateTest
