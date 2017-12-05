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

        let delegateFundsButton = (
        <IconButton
            onClick = {this.onAddButton}
            style = {{color:'grey'}}
            tooltip = {'Delegate funds to '+this.props.delegation.name}
            >
            <Icons.add size={15}/>
        </IconButton>)


        let cancelDelegateButton = <div style = {Styles.emptyButton} />
        
        if(canCancel)
        {
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

        let headerStyle = MergeIf(Styles.delegation.header, Styles.delegation.rootHeader, (this.props.indentLevel===0))

        return (

            <div
                style = {MergeIf(headerStyle, Styles.delegation.delegateBackgroundHover, this.state.isHovering)}
                onMouseEnter = {this.onMouseEnter}
                onMouseLeave = {this.onMouseLeave}
                onClick = {this.onBackgroundClick}>

                <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.shrink)}>
                     <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.delegation.name}
                    </p>

                    <p key = {"amount"} style = {Styles.delegation.amount} >
                        {Currency.symbol+ " "+ Currency.format(Currency.toEther(this.props.delegation.assignedAmount))}
                    </p>
                   
                </div>

                 <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.row)}>

                    {actionButons}

                </div>       
            </div>
        )
    }
}

export default RootDelegation
