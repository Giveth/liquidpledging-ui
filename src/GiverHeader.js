import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class GiverHeader extends Component {

    constructor(props){
        super()
    }

    onToggle=()=>
    {
        this.props.onToggle(!this.props.colapsed)
    }

    onAddButton=()=>
    {
        Caller.donate(this.props.adminId, this.props.adminId, 2.3)
    }
   
    render() {
        let tooggleIcon = <Icons.shown size={20}/>

        if(this.props.colapsed)
        {
            tooggleIcon =<Icons.colapsed size={20}/>
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

        let addFundsButton = <div/>

         if(this.props.userAddress == this.props.adminAddress)
        {
            addFundsButton = (
                <IconButton
                 
                    onClick = {this.onAddButton}>

                    <Icons.add size={30}/>

                </IconButton>)
        }


        let totalAmount = this.props.assignedAmount
        let availableAmount = this.props.availableAmount
        let usedAmount = totalAmount - availableAmount

        return (

                 <div style = {Merge(Styles.delegation.header, Styles.delegation.giverHeader)}>
                   
                    <div style = {Styles.delegation.colapseButton}>
                        {colapseButton}
                    </div>

                    <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.name}
                    </p>

                    <p key = {"amount"} style = {Styles.delegation.amount} >
                        {Currency.symbol+ " "+Currency.toEther(usedAmount) +' / '+ Currency.toEther(totalAmount)}
                    </p>

                    <div style = {Styles.delegation.colapseButton}>
                        {addFundsButton}
                    </div>

            </div>
        )
    }
}

export default GiverHeader
