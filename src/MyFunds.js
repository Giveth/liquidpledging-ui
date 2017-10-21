import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'

class MyFunds extends Component {

    constructor(){
        super()

        this.state={
            network:"",
            currentAddress:"",
            treeChildren:[]
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{
        this.setState({
            //tree:LPState.getDelegations(this.state.currentAddress)
            tree:LPState.getDelegationsTrees(LPState.getDelegations())
        })
    }

    onAccountChanged=()=>{
        let newAccount = LPState.getCurrentAccount()
        this.setState({currentAddress:newAccount})
    }

    onNetworkChanged=()=>{
        let newNetwork = LPState.getCurrentNetwork().name
        this.setState({network:newNetwork})
    }

    render() {

        return (
            <div >
                <DelegationsList treeChildren={this.state.tree} indentLevel={0} userAddress={this.state.currentAddress}/>
                <p key = {"currentAddress"} style ={{wordWrap: 'break-word'}}> {this.state.currentAddress} </p>
                <pre key = {"data"} style ={{wordWrap: 'break-word'}}> {this.state.data} </pre>
            </div>
        )
    }
}

export default MyFunds
