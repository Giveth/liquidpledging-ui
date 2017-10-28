import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class ProjecDelegationtHeader extends Component {

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
        let transferData={
            giverName:this.props.delegation.name,
            emiterId:0,
            recieverId:this.props.delegation.adminId,
            amount:undefined
        }

        Caller.showTransferDialog(transferData)
    }

    onCancel=()=>
    {
        Caller.showCancelDialog(this.props.delegation)
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
        console.log(this.props.delegation)
        //this.props.onToggle(!this.props.colapsed)
    }
   
    render() {

        let isAdmin = (this.props.userAddress === this.props.delegation.adminAddress)
        let canCancel = true

        let toggleIcon = <Icons.colapsed size={20}/>
        if(this.props.colapsed)
            toggleIcon =<Icons.shown size={20}/>

        let colapseButton = <div style = {Styles.emptyButton} />
        if(this.props.showColapseButton)
            colapseButton = (<IconButton onClick = {this.onToggle}> {toggleIcon} </IconButton>)


        let delegateFundsButton = (
        <IconButton
            onClick = {this.onAddButton}
            style = {{color:'grey'}}>
            <Icons.add size={15}/>
        </IconButton>)


        let cancelDelegateButton = <div style = {Styles.emptyButton} />
        
        if(canCancel)
        {
            cancelDelegateButton=(
            <IconButton
                onClick = {this.onCancel}
                style = {{color:'grey'}}>
                <Icons.cancel size={15}/>
            </IconButton>)
        }
        
        let actionButons = <div/>
        
        if(this.state.isHovering)
        {
            actionButons =(
                <div style = {Styles.delegation.actionButons}>
                    {cancelDelegateButton}
                    {delegateFundsButton}
                </div>)
        }

        let headerStyle = MergeIf(Styles.delegation.header, Styles.delegation.rootHeader, (this.props.indentLevel===0))

        return (

            <div
                style = {MergeIf(headerStyle, Styles.delegation.delegateBackgroundHover, this.state.isHovering)}
                onMouseEnter = {this.onMouseEnter}
                onMouseLeave = {this.onMouseLeave}
                onClick = {this.onBackgroundClick}>

                <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.shrink)}>

                    <div style = {Styles.emptyButton} >
                        <Icons.project size={15}/>
                    </div>

                     <p key = {"name"}  style= {MergeIf(Styles.delegation.title, Styles.adminColor, isAdmin)}>
                        {this.props.delegation.name}
                    </p>

                    <p key = {"amount"} style = {Styles.delegation.amount} >
                        {Currency.symbol+ " "+ Currency.format(Currency.toEther(this.props.delegation.availableAmount)) +' / '+ Currency.format(Currency.toEther(this.props.delegation.assignedAmount))}
                    </p>
                   
                </div>

                 <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.row)}>

                    {actionButons}
                    {colapseButton}     

                </div>       
            </div>
        )
    }
}

export default ProjecDelegationtHeader
