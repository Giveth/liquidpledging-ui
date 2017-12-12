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
        if(!currentAddress)
            return
            
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

    onAddFunds=(giverNode)=>
    {
        let donateData={
            giverName:giverNode.name,
            emiterId:giverNode.adminId,
            recieverId:giverNode.adminId,
            amount:undefined
        }
        Caller.showDonateDialog(donateData)
    }

    getAvailableButtons=()=>
    {
        function onDelegateFunds()
        {
            //that.onDelegateFunds(giverNode)
        }

        function onAssignToProject()
        {
            //that.onDelegateFunds(giverNode)
        }

        return (<div>
                    <FlatButton
                        onClick = {onDelegateFunds}
                        secondary = {false}
                        label={'Delegate'}
                        labelStyle = {{fontSize:11}}
                    />

                    <FlatButton
                        onClick = {onAssignToProject}
                        secondary = {false}
                        label={'Assign to project'}
                        labelStyle = {{fontSize:11}}
                    />
                </div>
            )
    }

    getHeader=(giverNode)=>
    {
        let that = this

        function onAddFunds()
        {
            that.onAddFunds(giverNode)
        }

        return (
            <div>
                <div style={Styles.row}>
                <div style = {Styles.sectionFrontCell}/>
                <div style = {Styles.sectionMiddleCell}/>   
                <div style = {Styles.sectionBackCell}>
                    <FlatButton
                        onClick = {onAddFunds}
                        secondary = {false}
                        label={'Add Funds'}
                        labelStyle = {{fontSize:11}}
                    />     
                </div>
            </div>
         </div>
        )
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
            let assignedAmount = LPState.getNodeAssignedAmount(giverNode)
            let availableAmount = assignedAmount - delegatedAmount - assignedToProjectsAmount
            
    
            let totalAmount = availableAmount + delegatedAmount + assignedToProjectsAmount
            totalGiverAmount += assignedAmount

            let header = this.getHeader(giverNode)

            let availableButtons = this.getAvailableButtons()

            let card = <AdminCard
                key={giverNode.id}
                giverNode = {giverNode}
                userAddress={this.state.currentAddress}

                header = {header}

                delegationsIn={delegationsIn}
                delegationsOut={delegationsOut}
                delegationsToProject={delegationsToProject}
                
                availableAmount= {availableAmount}
                delegatedAmount = {delegatedAmount}
                assignedToProjectsAmount ={assignedToProjectsAmount}
                totalAmount = {totalAmount}

                availableButtons={availableButtons}
     
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
