import React from 'react'
import LPState from "./LiquidPledgingState.js"
import AdminCard from './AdminCard'
import Button from './Button'
import { Styles, Merge } from './Styles'
import Caller from './LiquidPledgingCaller'
import BaseDelegationPage from './BaseDelegationsPage'
import AppBar from './AppBar'
import Funds from './Funds.js'

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
        {
            this.setState({
                currentAddress:currentAddress,
                mergedAccounts:mergedAccounts
            })
            this.populateCards([])
            return
        }
            
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

    getAvailableButtons=(node, availableAmount)=>
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

        function onWithdraw()
        {
            
            let withdrawData={
                node:node
            }
                
            Caller.showWithdrawDialog(withdrawData)
            
        }
        
        let isDisabled = availableAmount<=0

        return (
            <div>
                <Button
                    onClick = {onWithdraw}
                    disabled = {isDisabled}
                    label={'Withdraw'}
                />
                
                <Button
                    onClick = {onDelegateFunds}
                    disabled = {isDisabled}
                    label={'Delegate'}
                />
                <Button
                    onClick = {onAssignToProject}
                    disabled = {isDisabled}
                    label={'Assign to project'}
                />
            </div>
            )
    }

    getAddFundsButton=(node)=>
    {
        let that = this

        function onAddFunds()
        {
            that.onAddFunds(node)
        }

        return (
            <Button
                onClick = {onAddFunds}
                label={'Add Funds'}
            />       
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

            let addFundsButton = this.getAddFundsButton(node)

            let availableButtons = this.getAvailableButtons(node, availableAmount, )

            let card = <AdminCard
                key={node.id}
                node = {node}
                userAddress={node.adminAddress}

                addFundsButton = {addFundsButton}

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

        return  (
            <div style = {Styles.page}>

                <AppBar>
                    <div style = {Styles.appBar.title}> {this.props.label} </div>
                    <Funds amount = {this.state.totalAmount} showCurrency/>
                </AppBar>
                

                <div style = {Styles.singlePage.body}>
                    
                    <div style = {Merge(Styles.singlePage.content, {height:window.innerHeight - Styles.appBar.getHeight() - 100})}>
                        
                        <div style = {Styles.card.buttonsRow}>
                            <Button onClick = {this.onNewGiver} primary = {true} label="New Giver" />
                        </div>

                        {this.state.cards}
                    </div>

                </div>
            </div>
        )
    }
}
export default MyFunds