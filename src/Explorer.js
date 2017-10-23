import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'
import {Styles, Merge} from './Styles'

const title = "Explorer"

class Explorer extends Component {

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

        let delegatesFilter = {type:'Delegate'}
        let delegatesNodes =  LPState.getNodes(delegatesFilter)
        let projectsFilter = {type:'Project'}
        let projectNodes =  LPState.getNodes(projectsFilter)

        let delegations = LPState.getFirstDelegationsForNodes(projectNodes.concat(delegatesNodes))
        let onlyDelegationsWithMoneyFilter= {assignedAmount:undefined}
        let myTrees = LPState.getDelegationsTrees(delegations, onlyDelegationsWithMoneyFilter)

        this.setState({
            treeChildren:myTrees,
            currentAddress:address,
        })
    }

    render() {

        return (
            <div >
                <DelegationsList treeChildren={this.state.treeChildren} indentLevel={-1} userAddress={this.state.currentAddress}/>
            </div>
        )
    }
}

export default Explorer
