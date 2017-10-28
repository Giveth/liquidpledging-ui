import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class GiverCardHeader extends Component {

    constructor(props){
        super()
    }

    onAddButton=()=>
    {
        let donateData={
            giverName:this.props.node.name,
            emiterId:this.props.node.adminId,
            recieverId:this.props.node.adminId,
            amount:undefined
        }
        Caller.showDonateDialog(donateData)
    }

   
    render() {
        let isAdmin = (this.props.userAddress === this.props.node.adminAddress)
       

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


        let totalAmount = this.props.node.assignedAmount
        let availableAmount = this.props.node.availableAmount
        let usedAmount = totalAmount - availableAmount

        let actionButons =(
            <div style = {Styles.delegation.actionButons}>
                {addFundsButton}
            </div>)
       


        let headerStyle = Merge(Styles.delegation.header, Styles.delegation.rootHeader)

        return (
            
            <div
                    style = {Merge(headerStyle, Styles.delegation.giverBackgroundHover)}
                    onMouseEnter = {this.onMouseEnter}
                    onMouseLeave = {this.onMouseLeave}
                    onClick = {this.onBackgroundClick}>

                    <div style = {Styles.delegation.headerCell}>
                   
                        <p
                            key = {"name"} 
                            style= {MergeIf(Styles.delegation.title, Styles.adminColor, isAdmin)}>

                            {this.props.node.name}
                        </p>

                        <p
                            key = {"amount"}
                            style = {Styles.delegation.amount} >

                            {Currency.symbol+ " "+Currency.format(Currency.toEther(usedAmount)) +' / '+ Currency.format(Currency.toEther(totalAmount))}
                        </p>

                    </div>

                    <div style = {Styles.delegation.headerCell}>
                        
                    </div>


                    <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.row)}>
                        {actionButons}
                    </div>

            </div>
        )
    }
}

export default GiverCardHeader
