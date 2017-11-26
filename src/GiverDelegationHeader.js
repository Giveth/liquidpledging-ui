import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class GiverDelegationHeader extends Component {

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
            giverName:this.props.delegation.name,
            emiterId:this.props.delegation.adminId,
            recieverId:this.props.delegation.adminId,
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
        console.log(this.props.delegation)
    }
   
    render() {
        let isAdmin = (this.props.userAddress === this.props.delegation.adminAddress)
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
                style = {{color:'grey'}}
                tooltip = {'Delegate funds to '+this.props.delegation.name}
                >

                <Icons.add size={15}/>
            </IconButton>)
        }


        let totalAmount = this.props.delegation.assignedAmount
        let availableAmount = this.props.delegation.availableAmount
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

        return (
            
            <div
                    style = {MergeIf(headerStyle, Styles.delegation.giverBackgroundHover, this.state.isHovering)}
                    onMouseEnter = {this.onMouseEnter}
                    onMouseLeave = {this.onMouseLeave}
                    onClick = {this.onBackgroundClick}>

                    <div style = {Styles.delegation.headerCell}>
                   
                        <p
                            key = {"name"} 
                            style= {MergeIf(Styles.delegation.title, Styles.adminColor, isAdmin)}>
                            {this.props.delegation.name}
                        </p>

                        <p
                            key = {"amount"}
                            style = {Styles.delegation.amount} >
                            {Currency.symbol+ " "+Currency.format(Currency.toEther(availableAmount))}
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

export default GiverDelegationHeader
