import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'
import {Styles, Merge, MergeIf} from './Styles'
import DelegateCard from './DelegateCard'

const title = 'My funds'

class OthersFunds extends Component {

    constructor(){
        super()

        this.state={
            delegateNodes:[],
            currentAddress:''
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
        let currentAddress = LPState.getCurrentAccount()
        let myGiversFilter = {adminAddress:currentAddress, type:'Delegate'}
        let delegateNodes = LPState.getNodes(myGiversFilter)

        this.setState({
            delegateNodes:delegateNodes,
            currentAddress:currentAddress
        })
    }

    createDelegateCards=()=>
    {
        let cards = []
        for(let delegateNode of this.state.delegateNodes)
        {
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}

            let delegatedDelegations = LPState.getDelegations(delegateNode.delegationsOut)
            let delegatesChildren = LPState.getDelegationsTrees(delegatedDelegations, onlyDelegationsWithMoneyFilter)

            let assignedDelegations = LPState.getDelegations(delegateNode.delegationsIn)
            let delegatesParents = LPState.getDelegationsTrees(assignedDelegations, onlyDelegationsWithMoneyFilter)

            let onlyProjectsFilter= {type:'Project'}
            let projectDelegations = LPState.getDelegationsFromTreeChildren(delegatesChildren, onlyProjectsFilter)

            console.log(projectDelegations)
            let projectsChildren = LPState.getDelegationsTrees(projectDelegations)

            let card = <DelegateCard
                key={delegateNode.id}
                delegateNode = {delegateNode}
                delegatesParents={delegatesParents}
                delegatesChildren={delegatesChildren}
                projectsChildren={projectsChildren}
                userAddress={this.state.currentAddress}/>

            cards.push(card)
        }
        return cards
    }

    render() {

        let cards = this.createDelegateCards()

        return  (
            <div >
                 {cards}
            </div>
        )

    }
}
export default OthersFunds
