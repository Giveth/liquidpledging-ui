import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import AdminCard from './AdminCard'
import FlatButton from 'material-ui/FlatButton'
import { Styles, Currency, Merge } from './Styles'
import Caller from './LiquidPledgingCaller'
import BaseDelegationPage from './BaseDelegationsPage'


class OthersFunds extends BaseDelegationPage {

    constructor(){
        super()

        this.state={
            nodes:[],
            currentAddress:'',
            totalAmount:0,
        }

    }

    setDelegations=()=>{
        console.log("SET")
        let currentAddress = LPState.getCurrentAccount()
        let mergedAccounts = LPState.getIsMergedAccounts()

        if(!currentAddress)
            return

        console.log("SET 2")
        let myDelegatesFilter = {adminAddress:currentAddress, type:'Delegate'}
        let nodes = []
        
        if(mergedAccounts)
        {
            let accounts = LPState.getAccounts()
            accounts.forEach(account => {
                let myDelegatesFilter = {adminAddress:account, type:'Delegate'}
                nodes = nodes.concat(LPState.getNodes(myDelegatesFilter))
            })
        }
        else
        {
            nodes = LPState.getNodes(myDelegatesFilter)
        }
        
        console.log("NODes")
    

        this.populateCards(nodes)

        this.setState({
            currentAddress:currentAddress,
            mergedAccounts: mergedAccounts
        })
    }

    onNewDelegate=()=>
    {
        let delegateType = 2
        let data = {defaultAdminType:delegateType}
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
                adminAddress:node.adminAddress
             }
             Caller.showFindDelegationsDialog(findDelegationsData)
        }

        return (<div>
                    <FlatButton
                        onClick = {onDelegateFunds}
                        secondary = {false}
                        label={'Subdelegate'}
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
        return (
            <div>
                <div style={Styles.row}>
                <div style = {Styles.sectionFrontCell}/>
                <div style = {Styles.sectionMiddleCell}/>
                <div style = {Styles.sectionBackCell}/>
            </div>
         </div>
        )
    }

    populateCards=(nodes)=>
    {
        let cards = []
        let totalDelegateAmount = 0
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
            let availableAmount = assignedAmount - delegatedAmount - assignedToProjectsAmount
    
            let totalAmount = availableAmount + delegatedAmount + assignedToProjectsAmount
            totalDelegateAmount += assignedAmount
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
            totalAmount:totalDelegateAmount,
        })
    }

    render() {
        
        let totalAmountText = "Total delegated to me " + Currency.symbol+Currency.format(Currency.toEther(this.state.totalAmount))

        return  (
            <div >

                <div style={Styles.row}>
                    <div style = {Styles.sectionFrontCell}>

                    </div>

                    <div style = {Merge(Styles.sectionMiddleCell, Styles.sectionTitle)}>
                        {totalAmountText}
                    </div>

                    <div style = {Styles.sectionBackCell}>
                        <FlatButton onClick = {this.onNewDelegate} primary = {true} label="New Delegate"  />
                    </div>
                </div>

                {this.state.cards}

            </div>
        )
    }
}
export default OthersFunds
