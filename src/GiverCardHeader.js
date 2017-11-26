import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'
//TODO remove LiquidPledgingState dependency
import LPState from "./LiquidPledgingState.js"
import FlatButton from 'material-ui/FlatButton'

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
       

        let addFundsButton = <div/>
        let delegateFundsButton = <div/>

        if(this.props.showAddFundsButton)
        {
           /* addFundsButton = (
                <IconButton
                onClick = {this.onAddButton}
                style = {{color:'grey'}}>

                <Icons.add size={15}/>
            </IconButton>)*/


            addFundsButton =  <FlatButton onClick = {this.onAddButton} secondary = {true} label="Add"  />
            delegateFundsButton =  <FlatButton onClick = {this.onAddButton} secondary = {true} label="Delegate funds" disabled = {true}  />
        }

        let assignedAmount = LPState.getNodeAssignedAmount(this.props.node)
        let delegateddAmount = LPState.getNodeDelegatedAmount(this.props.node)
        let availableAmount = assignedAmount - delegateddAmount
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

                <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.row)}>

                     <p
                        key = {"assignedAmount"}
                        style = {Styles.delegation.amount} >

                        {Currency.symbol+ Currency.format(Currency.toEther(assignedAmount))}
                    </p>

                    <div style ={Styles.space}/>

                    <p
                        key = {"availableAmount"}
                        style = {Merge(Styles.delegation.amount, {fontSize:'0.9em', color:'#bbb'})} >

                        {'('+Currency.symbol+ Currency.format(Currency.toEther(availableAmount))+' available)'}
                    </p>

                    {addFundsButton}
                </div>

            </div>
        )
    }
}

export default GiverCardHeader
