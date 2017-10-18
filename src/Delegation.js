import React, { Component } from 'react'
import DelegationsList from './DelegationsList'

class Delegation extends Component {

    constructor(props){
        super()

        this.state={}
    }
   
    render() {

        let indentLevel = this.props.indentLevel

        return (
            <div>
                <h3 key = {"delegate"} > {this.props.tree.delegation.id} </h3>
                <pre key = {"address"} > {this.props.tree.delegation.assignedAmount} </pre>
                <DelegationsList treeChildren={this.props.tree.children} indentLevel={indentLevel}/>
            </div>
        )
    }
}

export default Delegation
