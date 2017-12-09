import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class RootDelegation extends Component {

    constructor(props){
        super()
        this.state={isHovering:false}
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
    }
   
    render() {
        let canCancel = true
        let canDelegate = true

        if(this.props.delegation.type=="Project")
            canDelegate = false

        let amount = this.props.delegation.assignedAmount - this.props.delegation.assignedToProjectsAmount
       

        let cancelDelegateButton = <div style = {Styles.emptyButton} />
        let delegateFundsButton = <div style = {Styles.emptyButton} />

        if(canDelegate){
            delegateFundsButton = (
            <IconButton
                onClick = {this.onAddButton}
                style = {{color:'grey'}}
                tooltip = {'Delegate funds to '+this.props.delegation.name}
                >
                <Icons.add size={15}/>
            </IconButton>)
        }
        
        if(canCancel){
            cancelDelegateButton=(
            <IconButton
                onClick = {this.onCancel}
                style = {{color:'grey'}}
                tooltip = {'Cancel funding to '+this.props.delegation.name}
                >
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

        return (
            <div
                style = {Styles.rootDelegation}
                onMouseEnter = {this.onMouseEnter}
                onMouseLeave = {this.onMouseLeave}
                onClick = {this.onBackgroundClick}>

                <div style = {Styles.sectionFrontCell}>
                   
                     <p key = {"name"}  style= {Merge(Styles.delegation.title, {paddingLeft:10})}>
                        {this.props.delegation.name}
                    </p>
                </div>

                <div style = {Styles.sectionMiddleCell}>
                    <p key = {"amount"} style= {Merge(Styles.delegation.title, {fontSeize:'0.8em'})} >
                        {Currency.symbol+ " "+ Currency.format(Currency.toEther(amount))}
                    </p>

                    <div style ={Styles.space}/>

                    {actionButons}
                </div>   
                     
            </div>
        )
    }
}

export default RootDelegation
