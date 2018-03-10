import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"

class BaseDelegationsPage extends Component {

    componentWillMount()
    {
        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
        LPState.on(LPState.MERGED_ACCOUNTS_CHANGED, this.onMergedAccountsChanged)
    }

    componentWillUnmount()
    {
        LPState.removeListener(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.removeListener(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.removeListener(LPState.NETWORK_CHANGED, this.onNetworkChanged)
        LPState.removeListener(LPState.MERGED_ACCOUNTS_CHANGED, this.onMergedAccountsChanged)
    }

    componentDidMount()
    {
        this.setDelegations()
    }

    onStateChanged=()=>
    {
        this.setDelegations()
    }

    onAccountChanged=()=>
    {
        this.setDelegations()
    }

    onMergedAccountsChanged=()=>
    {
        this.setDelegations()
    }

    onNetworkChanged=()=>
    {
        this.setDelegations()
    }

    setDelegations=()=>
    {
       console.warn("Override me!")
    }

    render()
    {
        return  <div/>  
    }
}
export default BaseDelegationsPage