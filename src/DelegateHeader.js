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
                    onClick = {this.onToggle}
                    iconStyle={{width: 16, height: 16, color:'grey'}}
                    style={{width: 32,height: 32, padding:4, margin:8}}>
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
                   
                    <div style = {Styles.delegation.colapseButton}>
                        {colapseButton}
                    </div>

                    <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.name}
                    </p>

                    <p key = {"amount"} style = {Styles.delegation.amount} >
                        {Currency.symbol+ " "+ Currency.format(Currency.toEther(this.props.availableAmount)) +' / '+ Currency.format(Currency.toEther(this.props.assignedAmount))}
                    </p>

                    {addFundsButton}

                
            </div>
        )
    }
}

export default DelegateHeader
