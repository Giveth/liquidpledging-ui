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

        let myDelegatesFilter = {adminAddress:currentAddress, type:'Delegate'}
        let delegateNodes = LPState.getNodes(myDelegatesFilter)
        this.populateCards(delegateNodes)
        this.setState({
            currentAddress:currentAddress,
        })
    }

    onNewDelegate=()=>
    {
        let delegateType = 2
        let data = {defaultAdminType:delegateType}
        Caller.showAddAdminDialog(data)
    }

    getHeader=(giverNode)=>
    {
        let that = this

        function onAddFunds()
        {
            that.onAddFunds(giverNode)
        }
        
        function onDelegateFunds()
        {
            //that.onDelegateFunds(giverNode)
        }

        return (
            <div>
                <div style={Styles.row}>
                <div style = {Styles.sectionFrontCell}/>
                <div style = {Styles.sectionMiddleCell}/>
                <div style = {Styles.sectionBackCell}>

                    <FlatButton
                        onClick = {onDelegateFunds}
                        secondary = {false}
                        label={'Find Projects'}
                        labelStyle = {{fontSize:11}}
                    />
                </div>
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

            let card = <AdminCard
                key={delegateNode.id}
                giverNode = {delegateNode}
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
            totalAmount:totalDelegateAmount,
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
                        <FlatButton onClick = {this.onNewDelegate} primary = {true} label="New Delegate"  />
                    </div>
                </div>

                {this.state.cards}

            </div>
        )
    }
}
export default OthersFunds
