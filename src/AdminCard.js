import React, { Component } from 'react'
import { Styles, Currency, Merge } from './Styles'
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

    showPledgesDialog=(pledgesGroups)=>{
        let data = {
            pledgesBlocks: pledgesGroups,
            title: this.props.node.name
        }

        Caller.showPledgesDialog(data)
    }

    onCardPledges=()=>{
        let pledgesGroups = [
            this.getPledgesGroup('Available', this.props.delegationsIn),
            this.getPledgesGroup('Delegated', this.props.delegationsOut),
            this.getPledgesGroup('Assigned to Projects', this.props.delegationsToProject)
        ]

        this.showPledgesDialog(pledgesGroups)
    }

    onAvailablePledges=()=>{
        let pledgesGroups = [
            this.getPledgesGroup('Available', this.props.delegationsIn)
        ]

        this.showPledgesDialog(pledgesGroups)
    }

    onUsecuredPledges=()=>{
        /*
        let pledgesGroups = [
            this.getPledgesGroup('Unsecured', this.props.delegationsIn)
        ]

        this.showPledgesDialog(pledgesGroups)
        */
    }

    onDelegatedPledges=()=>{
        let pledgesGroups = [
            this.getPledgesGroup('Delegated', this.props.delegationsOut),
        ]

        this.showPledgesDialog(pledgesGroups)
    }

    onProjectsPledges=()=>{
        let pledgesGroups = [
            this.getPledgesGroup('Assigned to Projects', this.props.delegationsToProject)
        ]

        this.showPledgesDialog(pledgesGroups)
    }

    onDelegationPledge=(delegation)=>{
        console.log(delegation,"eureka")

        let pledgesGroups = [
            this.getPledgesGroup('', [delegation])
        ]

        this.showPledgesDialog(pledgesGroups)
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

    onMouseEnter=()=>
    {
        this.setState({isHovering:true})
    }

    onMouseLeave=()=>
    {
        this.setState({isHovering:false})
    }

    onBackgroundClick=()=>
    {
        //this.props.onToggle(!this.props.colapsed)
    }

    onDelegateFunds=()=>
    {

    }
   
    render() {

        let unsecured = <div/>
        if(this.props.node.type === "Project")

            unsecured = <div key= "Unsecured" style = {Merge(Styles.card.row, Styles.card.subHeader)} onClick = {this.onUsecuredPledges}>
                {"Unsecured"}
                <Funds amount = {this.props.unsecuredAmount}/>
            </div>


            /*unsecured =  <SectionHeader
                key = 'Unsecured'
                title='Unsecured'
                amount= {this.props.unsecuredAmount}
                onPledges = {this.onUsecuredPledges}/>
                */

        return ( 
            
          <div style = {Styles.card.body}>

                <div style = {Styles.card.header}>
                    <div style = {Styles.card.row} onClick = {this.onCardPledges}>
                        {this.props.node.name}
                        <div style = {Styles.row}>
                            {this.props.header}
                            <div style={Styles.space}/>
                            <Funds amount = {this.props.totalAmount}/>
                        </div>
                    </div>
                </div>

                <div style = {Styles.card.content}>

                {unsecured}

                <div key= "Available" style = {Merge(Styles.card.row, Styles.card.subHeader)} onClick = {this.onAvailablePledges}>
                    {"Available"}
                    <div style = {Styles.row}>
                        {this.props.availableButtons}
                        <div style={Styles.space}/>
                        <Funds amount = {this.props.availableAmount}/>
                    </div>
                </div>

                <div key= "Delegated" style = {Merge(Styles.card.row, Styles.card.subHeader)} onClick = {this.onDelegatedPledges}>
                    {"Delegated"}
                    <Funds amount = {this.props.availableAmount}/>
                </div>
                
                <RootDelegationList
                    key='Delegations'
                    delegations={this.props.delegationsOut}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}
                    onPledges={this.onDelegationPledge}/>

                <div key= "Intended Projects" style = {Merge(Styles.card.row, Styles.card.subHeader)} onClick = {this.onProjectsPledges}>
                    {'Intended Projects'}
                    <Funds amount = {this.props.assignedToProjectsAmount}/>
                </div>
                
                <RootDelegationList
                    key='Projects'
                    delegations={this.props.delegationsToProject}
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
