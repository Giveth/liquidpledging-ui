import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import AdminCard from './AdminCard'

class MyProjects extends Component {

    constructor(){
        super()

        this.state={
            projectNodes:[],
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
        let myGiversFilter = {adminAddress:currentAddress, type:'Project'}
        let projectNodes = LPState.getNodes(myGiversFilter)

        this.setState({
            projectNodes:projectNodes,
            currentAddress:currentAddress
        })
    }

    createProjectCards=()=>
    {
        let cards = []
        for(let projectNode of this.state.projectNodes)
        {
            let delegations = LPState.getDelegations(projectNode.delegationsOut)
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let delegatesChildren = LPState.getDelegationsTrees(delegations, onlyDelegationsWithMoneyFilter)

            let onlyProjectsFilter= {type:'Project'}
            let projectDelegations = LPState.getDelegationsFromTreeChildren(delegatesChildren, onlyProjectsFilter)

            let projectsChildren = LPState.getDelegationsTrees(projectDelegations)

            let card = <AdminCard
                key={projectNode.id}
                giverNode = {projectNode}
                delegatedDelegations={delegations}
                delegatesChildren={delegatesChildren}
                projectsChildren={projectsChildren}
                userAddress={this.state.currentAddress}/>

            cards.push(card)
        }
        return cards
    }

    render() {

        let cards = this.createProjectCards()

        return  (
            <div >
                 {cards}
            </div>
        )

    }
}
export default MyProjects
