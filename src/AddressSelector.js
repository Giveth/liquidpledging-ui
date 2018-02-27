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
            selectedIndex:0,
        }

        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
    }

    onAccountChanged=()=>
    {
        let accounts = LPState.getAccounts()
        if(accounts.length>1)
            accounts.push("*")

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
        let list = this.state.accounts.map((account, index,array)=>{

            let label = index +' - '+account
            let key = index
            if(account ==="*")
            {
                key = "*"
                label = "Merge all the accounts ("+(array.length-1)+")"
            }
                
            return <MenuItem

                key= {key}
                value={key}
                style={{fontSize:'0.8em'}}
                primaryText={label} />
        })

        return (
            <div style = {Styles.floatingAddressSelectorTopLeft}>
                <DropDownMenu
                    value={this.state.selectedIndex}
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