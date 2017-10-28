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

    createDelegateCards=()=>
    {
        let cards = []
        for(let giverNode of this.state.giverNodes)
        {
            let delegations = LPState.getDelegations(giverNode.delegationsOut)
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let delegatesChildren = LPState.getDelegationsTrees(delegations, onlyDelegationsWithMoneyFilter)

            let onlyProjectsFilter= {type:'Project'}
            let projectDelegations = LPState.getDelegationsFromTreeChildren(delegatesChildren, onlyProjectsFilter)

            console.log(projectDelegations)
            let projectsChildren = LPState.getDelegationsTrees(projectDelegations)

            let card = <DelegateCard
                key={giverNode.id}
                giverNode = {giverNode}
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
