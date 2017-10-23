import React, { Component } from 'react'
import LPState from './LiquidPledgingState'
import PledgesTable from './PledgesTable'
import {Styles, Merge} from './Styles'

class PledgesView extends Component {

    constructor(){
        super()

        this.state={
            network:'',
            pledges:[]
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{
        this.setDelegations()
    }

    onAccountChanged=()=>{
        this.setDelegations()
    }

    onNetworkChanged=()=>{
        this.setDelegations()
    }

    setDelegations=()=>
    {
        let address = LPState.getCurrentAccount()

        this.setState({
            pledges:LPState.pledges,
            currentAddress:address,
        })
    }

    render() {
        return (
            <div >
                <PledgesTable pledges = {this.state.pledges}/>
            </div>
        )
    }
}

export default PledgesView
