import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import AdminCard from './AdminCard'
import FlatButton from 'material-ui/FlatButton'
import { Styles, Currency, Merge } from './Styles'
import Caller from './LiquidPledgingCaller'
import BaseDelegationPage from './BaseDelegationsPage'

class MyFunds extends BaseDelegationPage
{

    constructor(){
        super()

        this.state={
            nodes:[],
            currentAddress:'',
            totalAmount:0,
        }

       
    }

    setDelegations=()=>{
        
        let currentAddress = LPState.getCurrentAccount()
        let mergedAccounts = LPState.getIsMergedAccounts()

        if(!currentAddress)
            return
            
        let myGiversFilter = {adminAddress:currentAddress, type:'Giver'}
        let nodes =[]

        if(mergedAccounts)
        {
            let accounts = LPState.getAccounts()
            accounts.forEach(account => {
                let myGiversFilter = {adminAddress:account, type:'Giver'}
                nodes = nodes.concat(LPState.getNodes(myGiversFilter))
            })
        }
        else
        {
            nodes = LPState.getNodes(myGiversFilter)    
        }
        this.populateCards(nodes)

        this.setState({
            currentAddress:currentAddress,
            mergedAccounts:mergedAccounts
        })
    }

    onNewGiver=()=>
    {
        let giverType = 1
        let data = {defaultAdminType:giverType}
        Caller.showAddAdminDialog(data)
    }

    onAddFunds=(node)=>
    {
        let donateData={
            giverName:node.name,
            emiterId:node.adminId,
            recieverId:node.adminId,
            adminAddress:node.adminAddress,
            amount:undefined
        }
        Caller.showDonateDialog(donateData)
    }

    getAvailableButtons=(node)=>
    {
        function onDelegateFunds()
        {
            let findDelegationsData={
                title:"",
                emiterId:node.id,
                adminTypes:["Delegate"],
                adminAddress:node.adminAddress
             }
             Caller.showFindDelegationsDialog(findDelegationsData)
        }

        function onAssignToProject()
        {
            let findDelegationsData={
                title:"",
                emiterId:node.id,
                adminTypes:["Project"],
                adminAddress:node.adminAddress
             }
             Caller.showFindDelegationsDialog(findDelegationsData)
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

    getHeader=(node)=>
    {
        let that = this

        function onAddFunds()
        {
            that.onAddFunds(node)
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

    populateCards=(nodes)=>
    {
        let cards = []
        let totalGiverAmount = 0

        for(let node of nodes)
        {
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let onlyProjectsFilter= {type:'Project'}

            let delegationsIn = LPState.getDelegations(node.delegationsIn) 

            let delegationsOut = LPState.getDelegations(node.delegationsOut) //Delegation. To  
            let childrenOut = LPState.getDelegationsTrees(delegationsOut, onlyDelegationsWithMoneyFilter)// Children. To. No money

            let delegationsToProject = LPState.getDelegationsFromTreeChildren(childrenOut, onlyProjectsFilter) //Delegations. Any level. Projects

            //let projectsChildren = LPState.getDelegationsTrees(assignedToProjectsDelegations)//Children. Any level. Projects

            let assignedToProjectsAmount = LPState.getNodeAssignedToProjectsAmount(node) 
            let delegatedAmount = LPState.getNodeDelegatedAmount(node) - assignedToProjectsAmount
            let assignedAmount = LPState.getNodeAssignedAmount(node)
            let availableAmount = assignedAmount - delegatedAmount - assignedToProjectsAmount
            
            let totalAmount = availableAmount + delegatedAmount + assignedToProjectsAmount
            totalGiverAmount += assignedAmount

            let header = this.getHeader(node)

            let availableButtons = this.getAvailableButtons(node)

            let card = <AdminCard
                key={node.id}
                node = {node}
                userAddress={node.adminAddress}

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
        let totalAmountText = 'My Funds total'+ Currency.symbol+Currency.format(Currency.toEther(this.state.totalAmount.toString()))

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