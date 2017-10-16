import React, { Component } from 'react'

class Delegation extends Component {

    constructor(props){
        super()

        this.state={}

    }
   
    render() {
        return (
            <div>
                <h3 key = {"delegate"} > {this.props.delegation.currentDelegate.name} </h3>
                <pre key = {"address"} > {this.props.delegation.currentDelegate.addr} </pre>
            
            </div>
        )
    }
}

export default Delegation
