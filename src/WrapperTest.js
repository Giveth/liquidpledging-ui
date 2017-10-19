import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'

class LPStateTest extends Component {

    constructor(){
        super()

        this.state={
            network:"",
            account:"",
            treeChildren:[]
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{

        let delegation = LPState.getDelegation("1")
        this.setState({
            tree:LPState.getGiverDelegations(this.state.account)
            //tree:[LPState.getDelegationTree(delegation)]
        })
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
                <DelegationsList treeChildren={this.state.tree} indentLevel={0}/>
                <h3 key = {"account"} style ={{wordWrap: 'break-word'}}> {this.state.account} </h3>
                <pre key = {"data"} style ={{wordWrap: 'break-word'}}> {this.state.data} </pre>
            </div>
        )
    }
}

export default LPStateTest
