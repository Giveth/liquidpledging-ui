import React, { Component } from 'react'
import { Styles, Merge } from './Styles'
import Caller from './LiquidPledgingCaller'
import RootDelegationList from './RootDelegationList'
import LPState from "./LiquidPledgingState.js"
import Funds from './Funds.js'

class AdminCard extends Component {

    constructor(props){
        super()
        this.state={isHovering:false}
    }

    onToggle=()=>
    {  
        this.props.onToggle(!this.props.colapsed)
    }

    showPledgesDialogPlus=(selectedIds)=>{

        let pledgesGroups = [
            this.getPledgesGroup('Available', this.props.delegationsIn),
            this.getPledgesGroup('Delegated', this.props.delegationsOut),
            this.getPledgesGroup('Assigned to Projects', this.props.delegationsToProject)
        ]

        let data = {
            pledgesBlocks: pledgesGroups,
            title: this.props.node.name,
            selectedIds:selectedIds
        }

        Caller.showPledgesDialog(data)
    }

    onCardPledges=()=>{
        this.showPledgesDialogPlus([])
    }

    onAvailablePledges=()=>{

        let selectedIds = LPState.getPledgesIdsFromDelegations(this.props.delegationsIn.filter((delegation)=>{
            let pledge  = LPState.getPledge(delegation.pledgeId)
            return pledge.owner === this.props.node.id
        }))
        this.showPledgesDialogPlus(selectedIds)
    }

    onUnsecuredPledges=()=>{
        let selectedIds = LPState.getPledgesIdsFromDelegations(this.props.delegationsIn.filter((delegation)=>{
            let pledge  = LPState.getPledge(delegation.pledgeId)
            return pledge.owner !== this.props.node.id
        }))
        this.showPledgesDialogPlus(selectedIds)
    }

    onDelegatedPledges=()=>{
        let selectedIds = LPState.getPledgesIdsFromDelegations(this.props.delegationsOut)
        this.showPledgesDialogPlus(selectedIds)
    }

    onProjectsPledges=()=>{
        let selectedIds = LPState.getPledgesIdsFromDelegations(this.props.delegationsToProject)
        this.showPledgesDialogPlus(selectedIds)
    }

    onDelegationPledge=(delegation)=>{
        let selectedIds = LPState.getPledgesIdsFromDelegations([delegation])

        this.showPledgesDialogPlus(selectedIds)
    }

    getPledgesGroup(title, delegations)
    {
        let pledgesIds = LPState.getPledgesIdsFromDelegations(delegations)
        let pledges = LPState.getPledgesFromIds(pledgesIds)

        let group = {
            pledges:pledges,
            title:title
        }
        return group
    }
   
    render() {

        let unsecured = <div/>
        let unsecuredDivider = <div/>

        if(this.props.node.type === "Project")
        {
            unsecured = <div key= "Unsecured" style = {Merge(Styles.card.row, Styles.card.subHeader)} onClick = {this.onUnsecuredPledges}>
                {"Unsecured"}
                <Funds amount = {this.props.unsecuredAmount}/>
            </div>

            unsecuredDivider = <div style={Styles.card.divider}/>
        }

        return ( 
            
          <div style = {Styles.card.body}>

                <div style = {Styles.card.header}>
                    <div style = {Styles.card.row}>
                    <div onClick = {this.onCardPledges} >{this.props.node.name}</div>
                       
                        <Funds showCurrency amount = {this.props.totalAmount}/>
                        
                    </div>
                </div>  

                <div style = {Styles.card.content}>

                    <div style = {Styles.card.buttonsRow}>
                        {this.props.addFundsButton}
                        {this.props.availableButtons}
                    </div>
                    <div style={Styles.card.divider}/>
                    {unsecured}
                    {unsecuredDivider}

                    <div key= "Available" style = {Merge(Styles.card.row, Styles.card.subHeader)}>
                        <div onClick = {this.onAvailablePledges} >{"Available"}</div>
                         <Funds amount = {this.props.availableAmount}/>
                    </div>
                    
                    <div style={Styles.card.divider}/>

                    <div key= "Delegated" style = {Merge(Styles.card.row, Styles.card.subHeader)}>
                        <div onClick = {this.onDelegatedPledges} >{"Delegated"}</div>
                        <Funds amount = {this.props.delegatedAmount}/>
                    </div>

                    <RootDelegationList
                        key='Delegations'
                        delegations={this.props.delegationsOut}
                        node={this.props.node}
                        indentLevel={-1}
                        userAddress={this.props.currentAddress}
                        defaultColapsed = {false}
                        defaultColapsedRoot={true}
                        onPledges={this.onDelegationPledge}/>

                    <div style={Styles.card.divider}/>


                    <div key= "Intended Projects" style = {Merge(Styles.card.row, Styles.card.subHeader)} onClick = {this.onProjectsPledges}>
                        {'Intended Projects'}
                        <Funds amount = {this.props.assignedToProjectsAmount}/>
                    </div>
                    
                    <RootDelegationList
                        key='Projects'
                        delegations={this.props.delegationsToProject}
                        node={this.props.node}
                        indentLevel={-1}
                        userAddress={this.props.currentAddress}
                        defaultColapsed = {false}
                        defaultColapsedRoot={true}
                        onPledges={this.onDelegationPledge}/>

                </div>

            </div>

        )
    }
}

export default AdminCard
