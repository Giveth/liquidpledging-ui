import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'
import DelegationsList from './DelegationsList'
import GiverCardHeader from './GiverCardHeader'
import Paper from 'material-ui/Paper'

class DelegateCard extends Component {

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
        Caller.showPledgesDialog({})
    }

    onAddButton=()=>
    {
        let donateData={
            giverName:this.props.delegateNode.name,
            emiterId:this.props.delegateNode.adminId,
            recieverId:this.props.delegateNode.adminId,
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
   
    render() {

        let isAdmin = (this.props.currentAddress === this.props.delegateNode.adminAddress)
        let toggleIcon = <Icons.colapsed size={20}/>

        if(this.props.colapsed)
        {
            toggleIcon =<Icons.shown size={20}/>
        }

        let colapseButton = <div style = {Styles.emptyButton} />
        if(this.props.showColapseButton)
        {
            colapseButton = (
                <IconButton
                    style = {Styles.inline}
                    onClick = {this.onToggle}>
                    {toggleIcon}
                </IconButton>)
        }

        let addFundsButton = <div style = {Styles.emptyButton} />

         if(isAdmin)
        {
            addFundsButton = (
                <IconButton
                onClick = {this.onAddButton}
                style = {{color:'grey'}}>

                <Icons.add size={15}/>
            </IconButton>)
        }


        let totalAmount = 0//this.props.delegateNode.assignedAmount
        let availableAmount = 0//this.props.delegateNode.availableAmount
        let usedAmount = totalAmount - availableAmount

        let actionButons = <div/>

        if(this.state.isHovering)
        {
            actionButons =(
                <div style = {Styles.delegation.actionButons}>
                    {addFundsButton}
                </div>)
        }

        let headerStyle = Merge(Styles.delegation.header, Styles.delegation.rootHeader)
        let assignedDelegationsSubtitle = 'Assigned to you ...'
        let delegatedDelegationsSubtitle = 'Delegating to ...'
        let projectsSubtitle = 'Intended projects ...'

        if(!this.props.delegatesChildren.length)
        {
            delegatedDelegationsSubtitle = 'No funds have been delegated'
            projectsSubtitle = ''
        }
        else
        {
            if(!this.props.projectsChildren.length)
                projectsSubtitle = 'No funds have been assigned to a Project'
        }

        return ( 
            
            <Paper style={{padding:20, marginTop:10, marginBottom:10}} zDepth={1}>

                <div style ={Styles.section}>{assignedDelegationsSubtitle}</div>

                 <DelegationsList
                    key='IncomingDelegations'
                    treeChildren={this.props.delegatesParents}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <GiverCardHeader 
                    node = {this.props.delegateNode}
                    userAddress={this.props.userAddress}
                    />

                <div style ={Styles.section}>{delegatedDelegationsSubtitle}</div>

                <DelegationsList
                    key='Delegations'
                    treeChildren={this.props.delegatesChildren}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <div style ={Styles.space}/>

                <div style ={Styles.section}>{projectsSubtitle}</div>

                <DelegationsList
                    key='Projects'
                    treeChildren={this.props.projectsChildren}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <div style ={Styles.space}/>

                <IconButton
                    style = {Styles.inline}
                    onClick = {this.onPledges}>
                    <Icons.pledges size={20}/>
                </IconButton>

            </Paper>
        )
    }
}

export default DelegateCard
