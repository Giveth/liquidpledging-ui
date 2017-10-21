import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class DelegateHeader extends Component {

    constructor(props){
        super()
    }

    onToggle=()=>
    {
        this.props.onToggle(!this.props.colapsed)
    }

    onAddButton=()=>
    {
        let transferData={
            giverName:this.props.name,
            emiterId:0,
            recieverId:this.props.adminId,
            amount:undefined
        }

        Caller.showTransferDialog(transferData)
    }
   
    render() {
        let tooggleIcon = <Icons.colapsed size={20}/>

        if(this.props.colapsed)
        {
            tooggleIcon =<Icons.shown size={20}/>
        }

        let colapseButton = <div/>
        if(this.props.showColapseButton)
        {
            colapseButton = (
                <IconButton
                    onClick = {this.onToggle}>
                    {tooggleIcon}
                </IconButton>)
        }

        let addFundsButton = (
            <IconButton
                onClick = {this.onAddButton}>
                <Icons.add size={30}/>
            </IconButton>)

        return (

            <div style = {Merge(Styles.delegation.header, Styles.delegation.delegateHeader)}>

                <div style = {Styles.delegation.headerCell}>
                     <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.name}
                    </p>

                    <p key = {"amount"} style = {Styles.delegation.amount} >
                        {Currency.symbol+ " "+ Currency.format(Currency.toEther(this.props.availableAmount)) +' / '+ Currency.format(Currency.toEther(this.props.assignedAmount))}
                    </p>
                   
                </div>

                <div style = {Styles.delegation.headerCell}>

                   {addFundsButton}
                    
                </div>

                 <div style = {Styles.delegation.headerCell}>

                    <div style = {Styles.delegation.colapseButton}>
                        {colapseButton}
                    </div>

                </div>       
            </div>
        )
    }
}

export default DelegateHeader
