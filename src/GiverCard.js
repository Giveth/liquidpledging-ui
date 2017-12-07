import React, { Component } from 'react'
import { Styles, Currency, Icons } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'
import RootDelegationList from './RootDelegationList'
import GiverCardHeader from './GiverCardHeader'
import Paper from 'material-ui/Paper'
//Todo. this shouldn't be here
import LPState from "./LiquidPledgingState.js"
import SectionHeader from './SectionHeader'

class GiverCard extends Component {

    constructor(props){
        super()
        this.state={isHovering:false}
    }

    onToggle=()=>
    {  
        this.props.onToggle(!this.props.colapsed)
    }

    onPledges=()=>
    {
        let delegatedPledgesIds = LPState.getPledgesIdsFromDelegations(this.props.delegatedDelegations)
        let delegatedPledges = LPState.getPledgesFromIds(delegatedPledgesIds)

        let assignedToProjectsPledgesIds = LPState.getPledgesIdsFromDelegations(this.props.assignedToProjectsDelegations)
        let assignedToProjectsPledges = LPState.getPledgesFromIds(assignedToProjectsPledgesIds)

        let data = {
            pledgesBlocks:
            [
                {
                    pledges:delegatedPledges,
                    title:"Delegated"
                },
                {
                    pledges:assignedToProjectsPledges,
                    title:"Assigned to Projects"
                },
            ],
            title: this.props.giverNode.name
        }

        Caller.showPledgesDialog(data)
    }

    onAddFunds=()=>
    {
        let donateData={
            giverName:this.props.giverNode.name,
            emiterId:this.props.giverNode.adminId,
            recieverId:this.props.giverNode.adminId,
            amount:undefined
        }
        Caller.showDonateDialog(donateData)
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

        //let isAdmin = (this.props.currentAddress === this.props.giverNode.adminAddress)
        //let toggleIcon = <Icons.colapsed size={20}/>

        /*
        if(this.props.colapsed)
        {
            toggleIcon =<Icons.shown size={20}/>
        }
        */
        /*
        //remove me, been here too longç
        let colapseButton = <div style = {Styles.emptyButton} />
        if(this.props.showColapseButton)
        {
            colapseButton = (
                <IconButton
                    style = {Styles.inline}
                    onClick = {this.onToggle}>
                    {toggleIcon}
                </IconButton>)
        }*/

       /* let addFundsButton = <div style = {Styles.emptyButton} />

         if(isAdmin)
        {
            addFundsButton = (
                <IconButton
                onClick = {this.onAddButton}
                style = {{color:'grey'}}>

                <Icons.add size={15}/>
            </IconButton>)
        }
*/
        /*let actionButons = <div/>

        if(this.state.isHovering)
        {
            actionButons =(
                <div style = {Styles.delegation.actionButons}>
                    {addFundsButton}
                </div>)
        }
        */

        //let headerStyle = Merge(Styles.delegation.header, Styles.delegation.rootHeader)
        /*
        let projectsSubtitle = ''
        let delegationsSubtitle = 'No funds have been delegated'

        
        let delegatedText = Currency.symbol+Currency.format(Currency.toEther(delegatedAmount))

        if(this.props.delegatesChildren.length)
        {
            delegationsSubtitle = delegatedText + 'Delegated funds'
            projectsSubtitle = 'Intended projects'

            if(!this.props.projectsChildren.length)
                projectsSubtitle = 'No funds have been assigned to a Project'
        }*/

        let assignedToProjectsAmount = LPState.getNodeAssignedToProjectsAmount(this.props.giverNode) 
        let delegatedAmount = LPState.getNodeDelegatedAmount(this.props.giverNode) - assignedToProjectsAmount
        let availableAmount = LPState.getNodeAssignedAmount(this.props.giverNode)

        let totalAmount = availableAmount + delegatedAmount + assignedToProjectsAmount

        return ( 
            
          <Paper style={{padding:20, marginTop:10, marginBottom:20}} zDepth={1}>

                <SectionHeader
                    key = 'title'
                    title= {this.props.giverNode.name}
                    titleStyle = {Styles.cardTitle}
                    amount= {this.props.totalAmount}
                    amountStyle = {Styles.cardTitle}
                    onPledges = {this.onPledges}/>

                <SectionHeader
                    key = 'Available'
                    title='Available'
                    amount= {this.props.availableAmount}
                    buttonLabel = "Add funds"
                    onActionButton = {this.onAddFunds}/>

                <SectionHeader
                    key = 'Delegated'
                    title='Delegated'
                    amount= {this.props.delegatedAmount}
                    buttonLabel = "Find project to delegate"
                    onActionButton = {this.onDelegateFunds}/>

                <RootDelegationList
                    key='Delegations'
                    delegations={this.props.delegatedDelegations}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <SectionHeader
                    key = 'Intended Projects'
                    title='Intended Projects'
                    amount= {this.props.assignedToProjectsAmount}
                    />

                <RootDelegationList
                    key='Projects'
                    delegations={this.props.assignedToProjectsDelegations}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

            </Paper>
        )
    }
}
/*
<GiverCardHeader 
                    node = {this.props.giverNode}
                    userAddress={this.props.userAddress}
                    showAddFundsButton = {true}
                    />



                <div style ={Styles.space}/>
                <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent:'flex-end',
                        alignItems: 'center',
                        color:'grey',
                    }}>

                    <IconButton
                        style = {{float: 'right', color:'grey'}}
                        onClick = {this.onPledges}>
                        <Icons.pledges size={15}/>
                    </IconButton>

                </div>
                */
export default GiverCard
