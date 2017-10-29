import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'
import DelegationsList from './DelegationsList'
import GiverCardHeader from './GiverCardHeader'
import Paper from 'material-ui/Paper'
//Todo. this shouldn't be here
import LPState from "./LiquidPledgingState.js"
import FlatButton from 'material-ui/FlatButton'


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
        let data = {
            pledgesBlocks:
            [
                {
                    pledges:delegatedPledges,
                    title:"Delegated"
                },
            ],
            title: this.props.giverNode.name
        }
        let pledgesBlocks

        Caller.showPledgesDialog(data)
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

        let actionButons = <div/>

        if(this.state.isHovering)
        {
            actionButons =(
                <div style = {Styles.delegation.actionButons}>
                    {addFundsButton}
                </div>)
        }


        let headerStyle = Merge(Styles.delegation.header, Styles.delegation.rootHeader)
        let projectsSubtitle = ''
        let delegationsSubtitle = 'No funds have been delegated'

        let delegateddAmount = LPState.getNodeDelegatedAmount(this.props.giverNode)
        let delegatedText = Currency.symbol+Currency.format(Currency.toEther(delegateddAmount))

        if(this.props.delegatesChildren.length)
        {
            delegationsSubtitle = delegatedText + ' delegated to'
            projectsSubtitle = 'Intended projects'

            if(!this.props.projectsChildren.length)
                projectsSubtitle = 'No funds have been assigned to a Project'
        }

        return ( 
            
            <Paper style={{padding:20, marginTop:10, marginBottom:10}} zDepth={1}>

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

            </Paper>


        )
    }
}

export default GiverCard
