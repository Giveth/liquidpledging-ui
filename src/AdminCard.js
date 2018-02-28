import React, { Component } from 'react'
import { Styles } from './Styles'
import Caller from './LiquidPledgingCaller'
import RootDelegationList from './RootDelegationList'
import Paper from 'material-ui/Paper'
import LPState from "./LiquidPledgingState.js"
import SectionHeader from './SectionHeader'

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
            unsecured =  <SectionHeader
                key = 'Unsecured'
                title='Unsecured'
                amount= {this.props.unsecuredAmount}
                onPledges = {this.onUsecuredPledges}/>

        return ( 
            
          <Paper style={{padding:20, marginTop:10, marginBottom:20}} zDepth={1}>

                {this.props.header}

                <SectionHeader
                    key = 'title'
                    title= {this.props.node.name}
                    titleStyle = {Styles.cardTitle}
                    amount= {this.props.totalAmount}
                    amountStyle = {Styles.cardTitle}
                    onPledges = {this.onCardPledges}/>

                {unsecured}

                <SectionHeader
                    key = 'Available'
                    title='Available'
                    amount= {this.props.availableAmount}
                    onPledges = {this.onAvailablePledges}
                    children = {this.props.availableButtons}/>

                <SectionHeader
                    key = 'Delegated'
                    title='Delegated'
                    amount= {this.props.delegatedAmount}
                    onPledges = {this.onDelegatedPledges}/>

                <RootDelegationList
                    key='Delegations'
                    delegations={this.props.delegationsOut}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}
                    onPledges={this.onDelegationPledge}/>

                <SectionHeader
                    key = 'Intended Projects'
                    title='Intended Projects'
                    amount= {this.props.assignedToProjectsAmount}
                    onPledges = {this.onProjectsPledges}/>

                <RootDelegationList
                    key='Projects'
                    delegations={this.props.delegationsToProject}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}
                    onPledges={this.onDelegationPledge}/>

            </Paper>
        )
    }
}

export default AdminCard
