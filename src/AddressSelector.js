import React from 'react'
import {Styles} from './Styles'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import LPState from "./LiquidPledgingState.js"

class AddressSelector extends React.Component
{
    constructor(props)
    {
        super()
        this.state={
            accounts:[],
            selectedAccount:"",
        }

        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.MERGED_ACCOUNTS_CHANGED, this.onMergedAccountsChanged)
    }

    onAccountChanged=()=>
    {
        this.setAccounts()
    }

    onMergedAccountsChanged=()=>
    {
        this.setAccounts()
    }

    setAccounts=()=>
    {
        let accounts = JSON.parse(JSON.stringify(LPState.getAccounts()) )
        let isMergedAccounts = LPState.getIsMergedAccounts()
        let selected = LPState.getCurrentAccount()

        if(accounts.length>1)
        {
            accounts.push("*")
            if(isMergedAccounts)
                selected = accounts[accounts.length-1]
        }

        this.setState({
            accounts:accounts,
            selectedAccount:selected
        })
    }

    onSelected = (event, index, newSelection) =>
    {
        LPState.setCurrentAccount(newSelection)
    }   
   
    render()
    {
        let list = this.state.accounts.map((account, index, array)=>{

            let label = index +' - '+account
            if(account ==="*")
                label = "Display as merged accounts ("+(array.length-1)+")"

            return <MenuItem
                key= {index}
                value={account}
                style={{fontSize:'0.8em'}}
                primaryText={label} />
        })

        return (
            <div style = {Styles.floatingAddressSelectorTopLeft}>
                <DropDownMenu
                    value={this.state.selectedAccount}
                    onChange={this.onSelected}
                    style={{fontSize:'0.8em'}}
                    autoWidth={true}>

                    {list}

                </DropDownMenu>
            </div>
        )
    }
}

export default AddressSelector;