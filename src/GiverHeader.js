import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class GiverHeader extends Component {

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
            giverName:this.props.name,
            emiter:this.props.adminId,
            reciever:this.props.adminId,
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
        this.props.onToggle(!this.props.colapsed)
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
                    onClick = {this.onToggle}>
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

        let actionButons = <div/>

        if(this.state.isHovering)
        {
            actionButons =(
                <div style = {Styles.delegation.colapseButton}>
                    {addFundsButton}
                </div>)
        }

        return (

                 <div
                    style = {Merge(Styles.delegation.header, Styles.delegation.giverHeader, Styles.delegation.getHoverStyle(this.state.isHovering))}
                    onMouseEnter = {this.onMouseEnter}
                    onMouseLeave = {this.onMouseLeave}
                    onClick = {this.onBackgroundClick}>

                    <div style = {Styles.delegation.headerCell}>
                   
                        <p key = {"name"}  style= {Styles.delegation.title}>
                            {this.props.name}
                        </p>

                        <p key = {"amount"} style = {Styles.delegation.amount} >
                            {Currency.symbol+ " "+Currency.toEther(usedAmount) +' / '+ Currency.toEther(totalAmount)}
                        </p>

                    </div>

                    <div style = {Styles.delegation.headerCell}>
                        {actionButons}
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

export default GiverHeader
