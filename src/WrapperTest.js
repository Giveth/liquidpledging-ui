import React, { Component } from 'react'
import Wrapper from "./LiquidPledgingController.js"

class WrapperTest extends Component {

    constructor(){
        super()

        this.state={
            data:[],
            network:"",
            account:""
        }

        Wrapper.on(Wrapper.STATE_CHANGED, this.onStateChanged)
        Wrapper.on(Wrapper.ACCOUNT_CHANGED, this.onAccountChanged)
        Wrapper.on(Wrapper.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{
        let newData = Wrapper.getData().toString()
        this.setState({data:newData})
    }

    onAccountChanged=()=>{
        let newAccount = Wrapper.getCurrentAccount()
        this.setState({account:newAccount})
    }

    onNetworkChanged=()=>{
        let newNetwork = Wrapper.getCurrentNetwork().name
        console.log(newNetwork)
        this.setState({network:newNetwork})
    }

    render() {
        return (
            <div >
                <h1 key = {"data"} style ={{wordWrap: 'break-word'}}> {this.state.data} </h1>
                <h1 key = {"account"} style ={{wordWrap: 'break-word'}}> {this.state.account} </h1>
                <h1 key = {"network"} style ={{wordWrap: 'break-word'}}> {this.state.network} </h1>
            </div>
        )
    }
}

export default WrapperTest
