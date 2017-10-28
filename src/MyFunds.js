import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'
import {Styles, Merge, MergeIf} from './Styles'
import GiverCard from './GiverCard'

const title = 'My funds'

class MyFunds extends Component {

    constructor(){
        super()

        this.state={
            giverNodes:[],
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
        let myGiversFilter = {adminAddress:currentAddress, type:'Giver'}
        let giverNodes = LPState.getNodes(myGiversFilter)

        this.setState({
            giverNodes:giverNodes,
            currentAddress:currentAddress
        })
    }

    createGiverCards=()=>
    {
        let cards = []
        for(let giverNode of this.state.giverNodes)
        {
            let delegations = LPState.getDelegations(giverNode.delegationsOut)
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let delegatesChildren = LPState.getDelegationsTrees(delegations, onlyDelegationsWithMoneyFilter)

            let onlyProjectsFilter= {type:'Project'}
            let projectDelegations = LPState.getDelegationsFromTreeChildren(delegatesChildren, onlyProjectsFilter)

            let projectsChildren = LPState.getDelegationsTrees(projectDelegations)

            let card = <GiverCard
                key={giverNode.id}
                giverNode = {giverNode}
                delegatedDelegations={delegations}
                delegatesChildren={delegatesChildren}
                projectsChildren={projectsChildren}
                userAddress={this.state.currentAddress}/>

            cards.push(card)
        }
        return cards
    }

    render() {

        let cards = this.createGiverCards()

        return  (
            <div >
                 {cards}
            </div>
        )

    }
}
export default MyFunds
