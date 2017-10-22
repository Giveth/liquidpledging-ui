import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'
import {Styles, Merge} from './Styles'

const title = "Other's Funds"

class OthersFunds extends Component {

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

        let myDelegatesFilter = {address:address, type:'Delegate'}
        let myNodes =  LPState.getNodes(myDelegatesFilter)
        let myDelegations = LPState.getFirstDelegationsForNodes(myNodes)
        let onlyDelegationsWithMoneyFilter= {assignedAmount:undefined}
        let myTrees = LPState.getDelegationsTrees(myDelegations, onlyDelegationsWithMoneyFilter)

        this.setState({
            treeChildren:myTrees,
            currentAddress:address,
        })
    }

    render() {

        return (
            <div >
                <p key = {"title"} style ={Styles.subtitle}> {title} </p>
                <p key = {"currentAddress"} style ={Merge(Styles.addressSubtle, Styles.adminColor)}> {this.state.currentAddress} </p>
                <DelegationsList treeChildren={this.state.treeChildren} indentLevel={-1} userAddress={this.state.currentAddress}/>
            </div>
        )
    }
}

export default OthersFunds
