import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles} from './Styles'
import LPState from "./LiquidPledgingState.js"
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

class DonateDialog extends React.Component
{
    constructor(props)
    {
        super();

        let isMergedAccounts = LPState.getIsMergedAccounts()
        let accounts = JSON.parse(JSON.stringify(LPState.getAccounts()) )
        let selectedAccount = LPState.getCurrentAccount()

        if(isMergedAccounts)
            selectedAccount = "*"

        this.state={
            amount:'',
            okDisabled:true,
            selectedAccount: selectedAccount,
            isMergedAccounts:isMergedAccounts,
            accounts:accounts
        }

    }

    onDone=()=>
    {
        let data = this.props.data
        data.amount = parseFloat(this.state.amount,10)
        data.address = this.props.data.adminAddress
        this.props.onDone(data)
        this.state={amount:'', okDisabled:true}
    }   

    onCancel=()=>
    {
        this.setState({amount:'', okDisabled:true})
        this.props.onCancel()
    }  

    //TODO: Check
    onTextChange = (e, newText) => {
        let state = {}

        if(!isNaN(newText))
            state.amount=newText

        state.okDisabled = !this.isReady(newText, this.state.selectedAccount)

       this.setState(state)
    }

    isReady(amount, address)
    {
        console.log(amount, address)
        if (isNaN(amount))
            return false
        
        if(amount === "")
            return false

        if(address==="*")
            return false

        return true
    }

    onAddressChanged = (event, index, selectedAddress) =>
    {
        let state = {}
        state.selectedAccount = selectedAddress
        state.okDisabled=!this.isReady(this.state.amount, selectedAddress)
        this.setState(state)
    }

    getAddressSelector=()=>
    {
        let select = <MenuItem
            key= {"*"}
            value={"*"}
            disabled = {true}
            primaryText={"Select an address"} />
        
        let list = this.state.accounts.map((account, index, array)=>{
                return <MenuItem
                   key= {index}
                    value={account}
                    primaryText={ index +' - '+account} />
            })

        list.unshift(select)

        return  <DropDownMenu
                    value={this.state.selectedAccount}
                    onChange={this.onAddressChanged}
                    autoWidth={true}>
                    {list}

                 </DropDownMenu>
    }

    onAddressChanged = (event, index, selectedAddress) =>
    {
        let state = {}
        state.selectedAccount = selectedAddress
        state.okDisabled=!this.isReady(this.state.selectedType,selectedAddress, this.state.name)
        this.setState(state)
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
              label="Add funds"
              primary={true}
              keyboardFocused={true}
              onClick={this.onDone}
              disabled={this.state.okDisabled}
            />
        ]

        let title = "Add funds to "+ this.props.data.giverName

        let addressSelector = <div/>

        if(this.state.isMergedAccounts)
            addressSelector = this.getAddressSelector()

        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={Styles.dialogs.narrow}>

                {addressSelector}

                <TextField
                    
                    autoFocus={true}
                    id="inputText"
                    hintText={'Ether to add'}
                    value={this.state.amount}
                    onChange={this.onTextChange}/>
                   
            </Dialog>
        )
    }
}

export default DonateDialog;