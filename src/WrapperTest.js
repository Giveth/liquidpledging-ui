import React, { Component } from 'react'
import Wrapper from "./LiquidPledgingController.js"

class WrapperTest extends Component {

    constructor(){
        super()

        Wrapper.on(Wrapper.STATE_CHANGED, this.onStateChanged)
        Wrapper.on(Wrapper.ACCOUNT_CHANGED, this.onAccountChanged)
        this.state={data:[1,2,3]}
    }

    onStateChanged=()=>{

        let data = Wrapper.getData()
        //this.setState({data:data})
    }

    onAccountChanged=()=>{
        let newAccount = Wrapper.getCurrentAccount()
        this.setState({data:newAccount})
    }

    render() {
        return (
            <div >
                <h1 style ={{wordWrap: 'break-word'}}> {this.state.data.toString()} </h1>
            </div>
        )
    }
}

export default WrapperTest
