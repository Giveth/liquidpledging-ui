import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'
class LPStateTest extends Component {

    constructor(){
        super()

        this.state={
            data:['{}'],
            network:"",
            account:""
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{
        console.log('STATE_CHANGED')
        let propertiesFilter = {}
        let delegationFilter = {adminId:3, level:1}
        let newState = LPState.getPledges(propertiesFilter, delegationFilter)
        let str = JSON.stringify(newState,null, 2)
        this.setState({data:str})
    }

    onAccountChanged=()=>{
        let newAccount = LPState.getCurrentAccount()
        this.setState({account:newAccount})
    }

    onNetworkChanged=()=>{
        let newNetwork = LPState.getCurrentNetwork().name
        this.setState({network:newNetwork})
    }

    render() {
        return (
            <div >
                <DelegationsList delegations={[1,23,4,5]}/>
                <h3 key = {"account"} style ={{wordWrap: 'break-word'}}> {this.state.account} </h3>
                <pre key = {"data"} style ={{wordWrap: 'break-word'}}> {this.state.data} </pre>
            
            </div>
        )
    }
}

export default LPStateTest
