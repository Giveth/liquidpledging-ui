import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class DelegateHeader extends Component {

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
        this.props.onToggle(!this.props.colapsed)
    }
   
    render() {
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
                    onClick = {this.onToggle}>
                    {toggleIcon}
                </IconButton>)
        }


         let addFundsButton = <div style = {Styles.emptyButton} />

         if(this.props.userAddress)
        {
            addFundsButton = (
            <IconButton
                onClick = {this.onAddButton}
                style = {{color:'grey'}}>

                <Icons.add size={15}/>
            </IconButton>)
        }

        let cancelDelegateButton = (
            <IconButton
                onClick = {this.onCancel}
                style = {{color:'grey'}}>
                <Icons.cancel size={15}/>
            </IconButton>)


        let actionButons = <div/>
        
        if(this.state.isHovering)
        {
            actionButons =(
                <div style = {Styles.inline}>
                    {cancelDelegateButton}
                    {addFundsButton}
                </div>)
        }


        return (

            <div
                style = {Merge(Styles.delegation.header, Styles.delegation.delegateHeader)}
                onMouseEnter = {this.onMouseEnter}
                onMouseLeave = {this.onMouseLeave}
                onClick = {this.onBackgroundClick}>


                <div style = {Styles.delegation.headerCell}>
                     <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.delegation.name}
                    </p>

                    <p key = {"amount"} style = {Styles.delegation.amount} >
                        {Currency.symbol+ " "+ Currency.format(Currency.toEther(this.props.delegation.availableAmount)) +' / '+ Currency.format(Currency.toEther(this.props.delegation.assignedAmount))}
                    </p>
                   
                </div>

                <div style = {Styles.delegation.headerCell}>
                   
                </div>

                 <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.row)}>

                    {actionButons}
                    {colapseButton}
                   

                </div>       
            </div>
        )
    }
}

export default DelegateHeader
