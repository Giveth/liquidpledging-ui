import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import AdminCard from './AdminCard'
import FlatButton from 'material-ui/FlatButton'
import { Styles, Currency, Merge } from './Styles'
import Caller from './LiquidPledgingCaller'

class MyProjects extends Component {

    constructor(){
        super()

        this.state={
            projectNodes:[],
            currentAddress:'',
            totalAmount:0,
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

    setDelegations=()=>{
        let currentAddress = LPState.getCurrentAccount()
        if(!currentAddress)
            return

        let myDelegatesFilter = {adminAddress:currentAddress, type:'Project'}
        let projectNodes = LPState.getNodes(myDelegatesFilter)
        this.populateCards(projectNodes)
        this.setState({
            currentAddress:currentAddress,
        })
    }

    onNewProject=()=>
    {
        let projectType = 3
        let data = {defaultAdminType:projectType}
        Caller.showAddAdminDialog(data)
    }

    getHeader=(projectNode)=>
    {
        return (
            <div>
            </div>
        )
    }

    populateCards=(projectNodes)=>
    {
        let cards = []
        let totalGiverAmount = 0
        for(let projectNode of projectNodes)
        {
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let onlyProjectsFilter= {type:'Project'}
            let onlyDelegatesFilter= {type:'Delegate'}

            let delegationsIn = LPState.getDelegations(projectNode.delegationsIn) 

            let delegationsOutWithProjects = LPState.getDelegations(projectNode.delegationsOut) //Delegation. To 
            let delegationsOut = LPState.filterDelegations(delegationsOutWithProjects, onlyDelegatesFilter)
            let childrenOut = LPState.getDelegationsTrees(delegationsOutWithProjects, onlyDelegationsWithMoneyFilter)// Children. To. No money

            let delegationsToProject = LPState.getDelegationsFromTreeChildren(childrenOut, onlyProjectsFilter) //Delegations. Any level. Projects

            //let projectsChildren = LPState.getDelegationsTrees(assignedToProjectsDelegations)//Children. Any level. Projects

            let assignedToProjectsAmount = LPState.getNodeAssignedToProjectsAmount(projectNode) 
            let delegatedAmount = LPState.getNodeDelegatedAmount(projectNode) - assignedToProjectsAmount
            let assignedAmount = LPState.getNodeAssignedAmount(projectNode)
            let availableAmount = assignedAmount - delegatedAmount - assignedToProjectsAmount
    
            let totalAmount = availableAmount + delegatedAmount + assignedToProjectsAmount
            totalGiverAmount += assignedAmount
            let header = this.getHeader(projectNode)

            let card = <AdminCard
                key={projectNode.id}
                giverNode = {projectNode}
                userAddress={this.state.currentAddress}

                header = {header}

                delegationsIn={delegationsIn}
                delegationsOut={delegationsOut}
                delegationsToProject={delegationsToProject}
                
                availableAmount= {availableAmount}
                delegatedAmount = {delegatedAmount}
                assignedToProjectsAmount ={assignedToProjectsAmount}
                totalAmount = {totalAmount}
                />

            cards.push(card)
        }

        this.setState({
            cards:cards,
            totalAmount:totalGiverAmount,
        })
    }

    render() {
        
        let totalAmountText = 'Total '+ Currency.symbol+Currency.format(Currency.toEther(this.state.totalAmount))

        return  (
            <div >

                <div style={Styles.row}>
                    <div style = {Styles.sectionFrontCell}>

                    </div>

                    <div style = {Merge(Styles.sectionMiddleCell, Styles.sectionTitle)}>
                        {totalAmountText}
                    </div>

                    <div style = {Styles.sectionBackCell}>
                        <FlatButton onClick = {this.onNewProject} primary = {true} label="New Project"  />
                    </div>
                </div>

                {this.state.cards}

            </div>
        )
    }
}
export default MyProjects
