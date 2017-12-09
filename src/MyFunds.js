import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import AdminCard from './AdminCard'
import FlatButton from 'material-ui/FlatButton'
import { Styles, Currency, Merge } from './Styles'
import Caller from './LiquidPledgingCaller'

class MyFunds extends Component {

    constructor(){
        super()

        this.state={
            giverNodes:[],
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
        let myGiversFilter = {adminAddress:currentAddress, type:'Giver'}
        let giverNodes = LPState.getNodes(myGiversFilter)
        this.populateCards(giverNodes)
        this.setState({
            currentAddress:currentAddress,
        })
    }

    onNewGiver=()=>
    {
        let giverType = 1
        let data = {defaultAdminType:giverType}
        Caller.showAddAdminDialog(data)
    }

    populateCards=(giverNodes)=>
    {
        let cards = []
        let totalGiverAmount = 0
        for(let giverNode of giverNodes)
        {
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let onlyProjectsFilter= {type:'Project'}

            let delegationsIn = LPState.getDelegations(giverNode.delegationsIn) 

            let delegationsOut = LPState.getDelegations(giverNode.delegationsOut) //Delegation. To  
            let childrenOut = LPState.getDelegationsTrees(delegationsOut, onlyDelegationsWithMoneyFilter)// Children. To. No money

            let delegationsToProject = LPState.getDelegationsFromTreeChildren(childrenOut, onlyProjectsFilter) //Delegations. Any level. Projects

            //let projectsChildren = LPState.getDelegationsTrees(assignedToProjectsDelegations)//Children. Any level. Projects

            let assignedToProjectsAmount = LPState.getNodeAssignedToProjectsAmount(giverNode) 
            let delegatedAmount = LPState.getNodeDelegatedAmount(giverNode) - assignedToProjectsAmount
            let availableAmount = LPState.getNodeAssignedAmount(giverNode)
    
            let totalAmount = availableAmount + delegatedAmount + assignedToProjectsAmount
            totalGiverAmount += totalAmount

            let card = <AdminCard
                key={giverNode.id}
                giverNode = {giverNode}
                userAddress={this.state.currentAddress}

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
                        <FlatButton onClick = {this.onNewGiver} primary = {true} label="New Giver"  />
                    </div>
                </div>

                {this.state.cards}

            </div>
        )
    }
}
export default MyFunds
