import React from 'react'
import LPState from "./LiquidPledgingState.js"
import AdminCard from './AdminCard'
import FlatButton from 'material-ui/FlatButton'
import { Styles, Currency, Merge } from './Styles'
import Caller from './LiquidPledgingCaller'
import BaseDelegationPage from './BaseDelegationsPage'
import AppBar from './AppBar'
import Funds from './Funds'


class MyProjects extends BaseDelegationPage {

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
        
        let MyProjectsFilter = {adminAddress:currentAddress, type:'Project'}
        let nodes = []

        if(mergedAccounts)
        {
            let accounts = LPState.getAccounts()
            accounts.forEach(account => {
                let MyProjectsFilter = {adminAddress:account, type:'Project'}
                nodes = nodes.concat(LPState.getNodes(MyProjectsFilter))
            })
        }
        else
        {
            nodes = LPState.getNodes(MyProjectsFilter)    
        }
        
        this.populateCards(nodes)

        this.setState({
            currentAddress:currentAddress,
            mergedAccounts:mergedAccounts
        })
    }

    onNewProject=()=>
    {
        let projectType = 3
        let data = {defaultAdminType:projectType}
        Caller.showAddAdminDialog(data)
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
                adminAddress: node.adminAddress
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

    populateCards=(nodes)=>
    {
        let cards = []
        let totalGiverAmount = 0
        for(let node of nodes)
        {
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let onlyProjectsFilter= {type:'Project'}
            let onlyDelegatesFilter= {type:'Delegate'}

            let delegationsIn = LPState.getDelegations(node.delegationsIn) 

            let delegationsOutWithProjects = LPState.getDelegations(node.delegationsOut) //Delegation. To 
            let delegationsOut = LPState.filterDelegations(delegationsOutWithProjects, onlyDelegatesFilter)
            let childrenOut = LPState.getDelegationsTrees(delegationsOutWithProjects, onlyDelegationsWithMoneyFilter)// Children. To. No money

            let delegationsToProject = LPState.getDelegationsFromTreeChildren(childrenOut, onlyProjectsFilter) //Delegations. Any level. Projects

            //let projectsChildren = LPState.getDelegationsTrees(assignedToProjectsDelegations)//Children. Any level. Projects

            let assignedToProjectsAmount = LPState.getNodeAssignedToProjectsAmount(node) 
            let delegatedAmount = LPState.getNodeDelegatedAmount(node) - assignedToProjectsAmount
            let assignedAmount = LPState.getNodeAssignedAmount(node)
            let securedAmount = LPState.getProjectNodeSecuredAmount(node)
            let unsecuredAmount = assignedAmount - securedAmount
            let availableAmount = assignedAmount - delegatedAmount - assignedToProjectsAmount - unsecuredAmount
            let availableButtons = this.getAvailableButtons(node)
    
            let totalAmount = availableAmount + delegatedAmount + assignedToProjectsAmount + unsecuredAmount
            totalGiverAmount += assignedAmount

            let card = <AdminCard
                key={node.id}
                node = {node}
                userAddress={this.adminAddress}

                delegationsIn={delegationsIn}
                delegationsOut={delegationsOut}
                delegationsToProject={delegationsToProject}
                
                availableAmount= {availableAmount}
                delegatedAmount = {delegatedAmount}
                assignedToProjectsAmount ={assignedToProjectsAmount}
                totalAmount = {totalAmount}
                unsecuredAmount = {unsecuredAmount}

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
                    <div style = {Styles.appBar.title}>
                        {this.props.label}
                    </div>

                    <Funds amount = {this.state.totalAmount} showCurrency/>

                    <div>
                        <FlatButton onClick = {this.onNewProject} primary = {true} label="New Project"  />
                    </div>

                </AppBar>
                

                <div style = {Styles.singlePage.body}>

                     <div style = {Merge(Styles.singlePage.content, {height:window.innerHeight - Styles.appBar.getHeight() - 50})}>
                        {this.state.cards}
                    </div>

                </div>
            </div>
        )
    }
}
export default MyProjects
