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

class TransferDialog extends React.Component
{
    constructor(props)
    {
        super();
        
        this.state={
            amount:'',
            delegationsAmounts:{},
            okDisabled:true,
            emiters:[],
            selectedEmiter:0,
            isAdvance:false
        }
    }

    componentWillReceiveProps(newProps)
    {
        let selectedEmiter = this.state.selectedEmiter
        if(newProps.data.emiterId>0 && this.state.selectedEmiter===0)
            selectedEmiter = newProps.data.emiterId

        let addressFilter={adminAddress:this.props.currentAddress}
        let userNodes=LPState.getNodes(addressFilter)

        let sortByAmount=(a, b)=>{
            return a.availableAmount < b.availableAmount
        }

        let emiters = {}
        userNodes.forEach((node)=>
        {
            let delegationsIn = LPState.getDelegations(node.delegationsIn).sort(sortByAmount)
            let totalAvailableAmount = 0
            delegationsIn.forEach((delegation)=>{totalAvailableAmount+=delegation.availableAmount})

            let emiter = {
                adminId:node.adminId,
                name:node.name,
                delegationsIn:delegationsIn,
                totalAvailableAmount:totalAvailableAmount
            }
            emiters[node.adminId] = emiter
        })
        
        this.setState({
            selectedEmiter:selectedEmiter,
            currentAddress:newProps.currentAddress,
            emiters:emiters
        })
    }

    onDone=()=>
    { 
        let data = {}
        let emiter = this.state.emiters[this.state.selectedEmiter]
        let highestAvailableAmount = emiter.delegationsIn[0].availableAmount
        let transferAmount = Currency.toWei(parseFloat(this.state.amount,10))
        
        if(highestAvailableAmount >= transferAmount)
        {          
            let delegation = this.state.emiters[this.state.selectedEmiter].delegationsIn[0]

            data.emiterId = this.state.selectedEmiter
            data.pledgeId = delegation.pledgeId
            data.recieverId = this.props.data.recieverId
            data.amount = transferAmount
    
            this.setState({amount:'', selectedEmiter:0, okDisabled:true})
            this.props.onTransferDone(data)
        }
        else
        {
            let addedTotal = 0
            let pledgeAmounts = []
            
            for(let delegationId in emiter.delegationsIn )
            {
                let delegation = emiter.delegationsIn[delegationId]
                let amount = delegation.availableAmount
                let missingAmount = transferAmount - addedTotal
                if(missingAmount >= amount)
                {
                    pledgeAmounts.push({amount:amount, id:delegation.pledgeId})
                    addedTotal += amount
                }
                else
                {
                    pledgeAmounts.push({amount:missingAmount, id:delegation.pledgeId})
                    addedTotal += missingAmount
                    break;
                }  
            }

            data.emiterId = this.state.selectedEmiter
            data.pledgeAmounts =pledgeAmounts
            data.recieverId = this.props.data.recieverId
            data.amount = parseFloat(this.state.amount,10)
    
            this.setState({amount:'', selectedEmiter:0, okDisabled:true})
            this.props.onMultiTransferDone(data)
        }
    }   

    onCancel=()=>
    {
        this.setState({amount:'', selectedEmiter:0, okDisabled:true})
        this.props.onCancel()
    }  

    onTextChange = (e, newText) => {
        let state = {}

        if(isNaN(newText))
            return

        let amount = parseFloat(newText)
        state.amount = amount
        state.okDisabled=!this.isReady(amount, this.state.selectedEmiter)
        state.delegationsAmounts = this.getDelegationsAmountsFromTotal(amount)

       this.setState(state)
    }

    onEmiterChanged = (event, index, selectedEmiter) =>
    {
        let state = {}
        state.selectedEmiter = selectedEmiter
        state.okDisabled=!this.isReady(this.state.amount, selectedEmiter)
        this.setState(state)
    }

    isReady=(amount, selectedEmiter)=>
    {
        if(!this.hasEnoughAmount(amount, selectedEmiter))
            return false

        if(!amount || isNaN(amount))
            return false

        if(!selectedEmiter)
            return false

        return true
    }

    hasEnoughAmount=(amount, selectedEmiter)=>
    {
        let availableAmount = Currency.toEther(this.state.emiters[selectedEmiter].totalAvailableAmount)
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

    getDelegationsAmountsFromTotal=(total)=>
    {
        let delegationsAmounts = {}
        let missingAmount = (total <= 0) ? 0 : total
        let availableDelegations = this.state.emiters[this.state.selectedEmiter].delegationsIn.filter(delegation=>{return delegation.availableAmount>0})
        
        availableDelegations.forEach(delegation => {
            let amount = (missingAmount > Currency.toEther(delegation.availableAmount)) ? Currency.toEther(delegation.availableAmount) :  missingAmount
            amount = isNaN(amount)?0:amount
            missingAmount -= amount
            delegationsAmounts[delegation.id] = amount
        })

        return delegationsAmounts
    }

    getTotalFromDelegationsAmounts(delegationsAmounts)
    {
        let total = 0
        for(let id in delegationsAmounts)
        {
            let amount = delegationsAmounts[id]
            console.log(amount)
            amount = isNaN(amount)?0:amount
            total += amount
        }
        console.log(total)
        return total
    }
    
    getAdvanceComponents=()=>
    {
        let availableDelegations = this.state.emiters[this.state.selectedEmiter].delegationsIn.filter(delegation=>{return delegation.availableAmount>0})

        let itemsList = availableDelegations.map(delegation => {
            let availableAmountText = Currency.format(Currency.toEther(delegation.availableAmount))

            let onTextChange=(e, newText) => {
                
                if(isNaN(newText))
                    return

                let state = {}
                state.delegationsAmounts = this.state.delegationsAmounts
                state.delegationsAmounts[delegation.id] = parseFloat(newText)
                state.amount = this.getTotalFromDelegationsAmounts(state.delegationsAmounts)
                
                this.setState(state)
            }

            
            let amount = isNaN(this.state.delegationsAmounts[delegation.id])?"":this.state.delegationsAmounts[delegation.id]

            let amountInput =<TextField
                fullWidth = {true}
                hintText={'Amount'}
                value={amount}
                onChange={onTextChange}
                errorText = {this.state.error}/>

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
    }

    render()
    {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.onCancel}
            />,
            <FlatButton
              label="Delegate funds"
              primary={true}
              keyboardFocused={true}
              onClick={this.onDone}
              disabled={this.state.okDisabled}
            />
        ]

        let title = "Delegate funds"
        let defaultItem = <MenuItem key= {0} value={0} primaryText={'Delegate from...'} disabled={true} />

        if(!this.state.emiters.length)
            defaultItem =  <MenuItem key= {0} value={0} primaryText={'No available accounts'} disabled={true} />

        let emitersList = [defaultItem]
        
        for(let adminId in this.state.emiters )
        {
            let emiter = this.state.emiters[adminId]
            let label = emiter.name+ " ("+Currency.symbol+" "+Currency.toEther(emiter.totalAvailableAmount)+")"
           
            let item =  <MenuItem
                key= {emiter.adminId}
                value={emiter.adminId}
                primaryText={label} />

            emitersList.push(item)
        }

        let advanceComponents = <div/>
        if(this.state.isAdvance)
            advanceComponents = this.getAdvanceComponents()

        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={Styles.dialogs.narrow}>

                <div> 
                    {"To " + this.props.data.giverName}
                </div>

                <div style={Merge(Styles.row,{})}>
                    <div style = {{lineHeight:"56px"}}>
                        {"From"}
                    </div>
                    <div style = {{Flex:1}}>
                        <DropDownMenu
                            style={{}}
                            value={this.state.selectedEmiter}
                            onChange={this.onEmiterChanged}
                            autoWidth={true}>

                            {emitersList}

                        </DropDownMenu>
                    </div>

                </div>

                <Toggle
                    label="Advanced"
                    toggled={this.state.isAdvance}
                    onToggle={this.onAdvanceToggle}
                    />

                {advanceComponents}

                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText={'Ether to delegate'}
                    value={this.state.amount}
                    onChange={this.onTextChange}
                    errorText = {this.state.error}/> 

            </Dialog>
        )
    }
}

export default TransferDialog;