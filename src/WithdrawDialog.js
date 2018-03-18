import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles, Currency, Merge} from './Styles'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import LPState from "./LiquidPledgingState.js"
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

const resetState = {
    amount:'',
    delegationsAmounts:{},
    delegationsErrors:{},
    okDisabled:true,
    adminAddress:"",
    //isAdvance:false
}

class WithdrawDialog extends React.Component
{
    constructor(props)
    {
        super()
        this.state = resetState
        this.state.node = props.data.node
        this.state.hasAdvance = props.data.node.delegationsIn<=1
        this.state.availableDelegations = this.getAvailableDelegations()
        this.state.totalAvailableAmount = this.state.availableDelegations.reduce((total,delegation)=>total+delegation.availableAmount,0)
    }

    getAvailableDelegations = ()=>
    {
        let delegationsInIds = this.state.node.delegationsIn
        let delegationsIn = LPState.getDelegations(delegationsInIds)
        let availableDelegations = delegationsIn.filter(d=>{return d.availableAmount>0})
        return availableDelegations
    }
    
    onTextChange = (e, newText) => {
        let state = {}

        if(isNaN(newText))
            return

        let amount = newText
        state.amount = amount
        state.okDisabled=!this.isReady(amount)
       // state.delegationsAmounts = this./*(amount)
        //state.delegationsErrors = this./*(amount)

       this.setState(state)
    }

    isReady=(amountEth)=>
    {
        let amount =  isNaN(parseFloat(amountEth))?0:Currency.toWei(parseFloat(amountEth))
        if(!this.hasEnoughAmount(amount, this.state.totalAvailableAmount))
            return false

        let delegationHasEnough = true

        /*
        this.state.availableDelegations.forEach(delegation => {
            if(delegation.availableAmount<Currency.toWei(this.state.delegationsAmounts[delegation.id]))
                delegationHasEnough =  false
        })
*/
        if(!delegationHasEnough)
            return false

        if(!amount || isNaN(amount))
            return false

        return true
    }

    hasEnoughAmount=(amount, availableAmount)=>
    {
        let enough = (amount <= availableAmount)
        let state= {}
        state.error = ''

        if(!enough || isNaN(amount))
            state.error = 'Not enough funds'

        this.setState(state)

        return enough
    }

    onAdvanceToggle=(e, isToggled)=>
    {
        this.setState({isAdvance:isToggled})
    }

    onDone=()=>
    { 
        let data={}
        data.pledgeId = this.state.availableDelegations[0].pledgeId
        data.amount = this.state.totalAvailableAmount// Currency.toWei(parseFloat(this.state.amount))
        console.log(data.amount)
        this.setState(resetState)
        this.props.onWithdrawDone(data)
       /* let data = {}
        let pledgeAmounts = []

        for(let delegationId in this.state.delegationsAmounts )
        {
            let delegation = LPState.getDelegation(delegationId)
            let amount = Currency.toWei(this.state.delegationsAmounts[delegationId])
            if(amount>0)
                pledgeAmounts.push({amount:amount, id:delegation.pledgeId})
        }

            
        if(pledgeAmounts.length===1)
        {
            data.pledgeId = pledgeAmounts[0].id
            data.amount = pledgeAmounts[0].amount
            this.setState(resetState)
            this.props.onTransferDone(data)
        }
        else
        {
            data.pledgeAmounts =pledgeAmounts
            data.amount = parseFloat(this.state.amount,10)
            this.setState(resetState)
            this.props.onMultiTransferDone(data)
        }*/
    }   

    onCancel=()=>
    {
        this.setState(resetState)
        this.props.onCancel()
    }

    /*getDelegationsAmountsFromTotal=(totalEth)=>
    {
        let total = isNaN(parseFloat(totalEth))?0:Currency.toWei(parseFloat(totalEth))
        let delegationsAmounts = {}
        let missingAmount = (total <= 0) ? 0 : total
        let availableDelegations = this.state.emiters[this.state.selectedEmiter].delegationsIn.filter(delegation=>{return delegation.availableAmount>0})
        
        availableDelegations.forEach(delegation => {

            let amount = (missingAmount >= delegation.availableAmount) ? delegation.availableAmount :  missingAmount
            amount = Number(isNaN(amount)?0:amount)
            
            missingAmount -= amount
            delegationsAmounts[delegation.id] = Currency.toEther(amount)
        })

        return delegationsAmounts
    }*/

    /*getDelegationsErrorsFromTotal=(total)=>
    {
        let availableDelegations = this.state.emiters[this.state.selectedEmiter].delegationsIn.filter(delegation=>{return delegation.availableAmount>0})
        let delegationsErrors = []
        availableDelegations.forEach(delegation => {
            delegationsErrors[delegation.id] = ""
        })

        return delegationsErrors
    }*/

   /* getTotalFromDelegationsAmounts(delegationsAmounts)
    {
        let total = 0
        for(let id in delegationsAmounts)
        {
            let amount = delegationsAmounts[id]
            amount = isNaN(parseFloat(amount))?0:Currency.toWei(parseFloat(amount))
            amount = isNaN(amount)?0:amount
            total += amount
        }
        return Currency.toEther(total)
    }*/
    
    /*getAdvanceComponents=()=>
    {
        //let availableDelegations =this.state.node.delegationsIn.filter(delegation=>{return delegation.availableAmount>0})
        let delegationsInIds = this.state.node.delegationsIn
        let delegationsIn = LPState.getDelegations(delegationsInIds)
        let availableDelegations = delegationsIn.filter(d=>{return d.availableAmount>0})

        let itemsList = availableDelegations.map(delegation => {
            let availableAmountText = Currency.format(Currency.toEther(delegation.availableAmount))

            let onTextChange=(e, newText) => {
                
                if(isNaN(newText))
                    return

                let error = ""
                let amount = isNaN(parseFloat(newText))?0:parseFloat(newText)
                
                if(amount > Currency.toEther(delegation.availableAmount))
                    error = 'Not enough funds'

                let state = {}
                state.delegationsAmounts = this.state.delegationsAmounts
                state.delegationsErrors = this.state.delegationsErrors
                state.delegationsAmounts[delegation.id] = newText
                state.delegationsErrors[delegation.id] = error
                state.amount = this.getTotalFromDelegationsAmounts(state.delegationsAmounts)
                state.okDisabled=!this.isReady(state.amount)
                this.setState(state)
            }
            
            let amount = isNaN(this.state.delegationsAmounts[delegation.id])?"":this.state.delegationsAmounts[delegation.id]

            let amountInput =<TextField
                fullWidth = {true}
                hintText={'Amount'}
                value={amount}
                onChange={onTextChange}
                errorText = {this.state.delegationsErrors[delegation.id]}/>

            let primary =(<div style={Merge(Styles.row,{justifyContent:"space-between"})}>
                    <div style = {{flex:1, lineHeight: "56px"}}>
                        {delegation.name + " ("+availableAmountText+")"}
                    </div>

                    <div style = {{width:100}}>
                        {amountInput}
                    </div>
                    
                </div>)
            
            return ( <ListItem
                style={{padding:0, paddingRight: 16, paddinLeft:16}}
                disabled = {true}
                primaryText={primary}
                key={delegation.id}
                secondaryTextLines={2}
            />)
        })

        return <List style={{maxHeight: 400, overflow: "auto"}}>
                    <Subheader>Define how much to delegate from each peldge</Subheader>
                    {itemsList}
                </List>
    }*/

    render()
    {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.onCancel}
            />,
            <FlatButton
              label="Withdraw funds"
              primary={true}
              keyboardFocused={true}
              onClick={this.onDone}
              disabled={this.state.okDisabled}
            />
        ]

        let title = "Withdraw funds from "+this.state.node.name
       
        let advanceToggle = <div/>
        let advanceComponents = <div/>

        if(this.state.hasAdvance)
            advanceToggle = (<Toggle
                    label="Advanced"
                    toggled={this.state.isAdvance}
                    onToggle={this.onAdvanceToggle}/>)

        //if(this.state.isAdvance)
           // advanceComponents = this.getAdvanceComponents()

        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={Styles.dialogs.fit}>

                {advanceComponents}

                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText={'Ether to withdraw'}
                    value={this.state.amount}
                    onChange={this.onTextChange}
                    errorText = {this.state.error}/> 

            </Dialog>
        )
    }
}

export default WithdrawDialog;