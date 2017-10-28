import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'
//TODO remove LiquidPledgingState dependency
import LPState from "./LiquidPledgingState.js"

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


        let assignedAmount = LPState.getNodeAssignedAmount(this.props.node)
        let delegateddAmount = LPState.getNodeDelegatedAmount(this.props.node)
        console.log(delegateddAmount)
        let usedAmount = assignedAmount - delegateddAmount

        let actionButons =(
            <div style = {Styles.delegation.actionButons}>
                {addFundsButton}
            </div>)

        return (
            
            <div style = {Styles.giverCardHeader}>

                <div style = {Styles.delegation.headerCell}>
                
                    <p key = {"name"}  style= {MergeIf(Styles.delegateRootTitle, Styles.adminColor, true)}>
                        {this.props.node.name}
                    </p>

                </div>

                <div style = {Styles.delegation.headerCell}>
                    <p
                        key = {"amount"}
                        style = {Styles.delegation.amount} >

                        {" Used: "+Currency.symbol+Currency.format(Currency.toEther(delegateddAmount)) +'  Available: '+Currency.symbol+ Currency.format(Currency.toEther(assignedAmount))}
                    </p>
                </div>

                <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.row)}>
                    {actionButons}
                </div>

            </div>
        )
    }
}

export default GiverCardHeader
