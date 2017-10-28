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

    onAddButton=()=>
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
   
    render() {

        let isAdmin = (this.props.currentAddress === this.props.giverNode.adminAddress)
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


        let totalAmount = 0//this.props.giverNode.assignedAmount
        let availableAmount = 0//this.props.giverNode.availableAmount
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
        let delegationsSubtitle = 'Delegating to ...'
        let projectsSubtitle = 'Intended projects ...'

        if(!this.props.delegatesChildren.length)
        {
            delegationsSubtitle = 'No funds have been delegated'
            projectsSubtitle = ''
        }
        else
        {
            if(!this.props.projectsChildren.length)
                projectsSubtitle = 'No funds have been assigned to a Project'
        }

        return ( 
            
            <Paper style={{padding:20, marginTop:10, marginBottom:10}} zDepth={1}>

                 <DelegationsList
                    key='IncomingDelegations'
                    treeChildren={this.props.delegatesParent}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <GiverCardHeader 
                    node = {this.props.giverNode}
                    userAddress={this.props.userAddress}
                    />

                <div style ={Styles.section}>{delegationsSubtitle}</div>

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
            </Paper>
        )
    }
}

export default DelegateCard
