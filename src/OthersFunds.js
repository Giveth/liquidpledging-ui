import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import AdminCard from './AdminCard'
import FlatButton from 'material-ui/FlatButton'
import { Styles, Currency, Merge } from './Styles'
import Caller from './LiquidPledgingCaller'

class OthersFunds extends Component {

    constructor(){
        super()

        this.state={
            delegateNodes:[],
            currentAddress:'',
            totalAmount:0,
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
        LPState.on(LPState.MERGED_ACCOUNTS_CHANGED, this.onMergedAccountsChanged)

    }

    onStateChanged=()=>{
        this.setDelegations()
    }

    onAccountChanged=()=>{
        this.setDelegations()
    }

    onMergedAccountsChanged=()=>{
        this.setDelegations()
    }

    onNetworkChanged=()=>{
        this.setDelegations()
    }

    setDelegations=()=>{
        let currentAddress = LPState.getCurrentAccount()
        let mergedAccounts = LPState.getIsMergedAccounts()

        if(!currentAddress)
            return

        let myDelegatesFilter = {adminAddress:currentAddress, type:'Delegate'}
        let delegateNodes = []
        
        if(mergedAccounts)
        {
            let accounts = LPState.getAccounts()
            accounts.forEach(account => {
                let myDelegatesFilter = {adminAddress:account, type:'Delegate'}
                delegateNodes = delegateNodes.concat(LPState.getNodes(myDelegatesFilter))
            })
        }
        else
        {
            delegateNodes = LPState.getNodes(myDelegatesFilter)
        }
        
        this.populateCards(delegateNodes)

        this.setState({
            currentAddress:currentAddress,
            mergedAccounts, mergedAccounts
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
                adminTypes:["Project"]
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

    getHeader=(giverNode)=>
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

    populateCards=(delegateNodes)=>
    {
        let cards = []
        let totalDelegateAmount = 0
        for(let delegateNode of delegateNodes)
        {
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let onlyProjectsFilter= {type:'Project'}
            let onlyDelegatesFilter= {type:'Delegate'}

            let delegationsIn = LPState.getDelegations(delegateNode.delegationsIn) 

            let delegationsOutWithProjects = LPState.getDelegations(delegateNode.delegationsOut) //Delegation. To 
            let delegationsOut = LPState.filterDelegations(delegationsOutWithProjects, onlyDelegatesFilter)
            let childrenOut = LPState.getDelegationsTrees(delegationsOutWithProjects, onlyDelegationsWithMoneyFilter)// Children. To. No money

            let delegationsToProject = LPState.getDelegationsFromTreeChildren(childrenOut, onlyProjectsFilter) //Delegations. Any level. Projects

            //let projectsChildren = LPState.getDelegationsTrees(assignedToProjectsDelegations)//Children. Any level. Projects

            let assignedToProjectsAmount = LPState.getNodeAssignedToProjectsAmount(delegateNode) 
            let delegatedAmount = LPState.getNodeDelegatedAmount(delegateNode) - assignedToProjectsAmount
            let assignedAmount = LPState.getNodeAssignedAmount(delegateNode)
            let availableAmount = assignedAmount - delegatedAmount - assignedToProjectsAmount
    
            let totalAmount = availableAmount + delegatedAmount + assignedToProjectsAmount
            totalDelegateAmount += assignedAmount
            let header = this.getHeader(delegateNode)
            let availableButtons = this.getAvailableButtons(delegateNode)

            let card = <AdminCard
                key={delegateNode.id}
                giverNode = {delegateNode}
                userAddress={delegateNode.adminAddress}

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
