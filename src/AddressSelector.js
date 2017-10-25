import React from 'react'
import {Styles, Currency} from './Styles'
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
            selectedIndex:0,
        }

        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
    }

    onAccountChanged=()=>
    {
        console.log("Hello")
        this.setState({
            accounts:LPState.getAccounts(),
            selectedIndex:LPState.getCurrentAccountIndex()
        })
    }

    onSelected = (event, index, newSelection) =>
    {
        LPState.setAccount(newSelection)
    }   
   
    render()
    {
        console.log(this.state.accounts, this.state.selectedIndex)
        let list = this.state.accounts.map((account, index)=>{

            let label = account
            return <MenuItem
                key= {index}
                value={index}
                primaryText={label} />
        })

        return (
            <div style = {Styles.floatingAddressSelectorTopLeft}>
                <DropDownMenu
                    value={this.state.selectedIndex}
                    onChange={this.onSelected}
                    autoWidth={true}>

                    {list}

                </DropDownMenu>
            </div>
        )
    }
}

export default AddressSelector;