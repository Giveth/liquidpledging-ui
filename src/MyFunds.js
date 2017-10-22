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
            treeChildren:[]
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{
        this.setDelegations()
    }

    onAccountChanged=()=>{
        this.setDelegations()
    }

    onNetworkChanged=()=>{
        this.setDelegations()
    }

    setDelegations=()=>
    {
        let address = LPState.getCurrentAccount()

        if(!address)
        {
            this.setState({
                treeChildren:[],
                currentAddress:'Not connected to Ethereum...  (╯°□°）╯︵ ┻━┻',
            })
            return
        }

        let myFilter = {address:this.state.currentAddress}
        let myNodes =  LPState.getNodes(myFilter)
        let myDelegations = LPState.getFirstDelegationsForNodes(myNodes)
        let myTrees = LPState.getDelegationsTrees(myDelegations)
        this.setState({
            treeChildren:myTrees,
            currentAddress:address,
        })
    }

    render() {

        return (
            <div >
                <p key = {"title"} style ={Styles.subtitle}> {title} </p>
                <p key = {"currentAddress"} style ={Styles.addressSubtle}> {this.state.currentAddress} </p>
                <DelegationsList treeChildren={this.state.treeChildren} indentLevel={0} userAddress={this.state.currentAddress}/>
            </div>
        )
    }
}

export default MyFunds
