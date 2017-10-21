import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'
import {Styles} from './Styles'

const title = 'My funds'

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
        let rootDelegations = LPState.getDelegations(this.state.currentAddress, "Giver") //only the ones with userAddress that are 'Giver'
        let trees = LPState.getDelegationsTrees(rootDelegations,{assignedAmount:undefined}) //All the children except the ones with assignedAmount = 0
        this.setState({ tree:trees })
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
                <p key = {"title"} style ={Styles.subtitle}> {title} </p>
                <p key = {"currentAddress"} style ={Styles.addressSubtle}> {this.state.currentAddress} </p>
                <DelegationsList treeChildren={this.state.tree} indentLevel={0} userAddress={this.state.currentAddress}/>
                <pre key = {"data"} style ={{wordWrap: 'break-word'}}> {this.state.data} </pre>
            </div>
        )
    }
}

export default MyFunds
