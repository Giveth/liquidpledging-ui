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
                <h3 key = {"name"} > {this.props.tree.delegation.name} </h3>
                <h3 key = {"url"} > {this.props.tree.delegation.url} </h3>
                <h3 key = {"type"} > {this.props.tree.delegation.type} </h3>
                <pre key = {"address"} > {this.props.tree.delegation.assignedAmount} </pre>
                <DelegationsList treeChildren={this.props.tree.children} indentLevel={indentLevel}/>
            </div>
        )
    }
}

export default Delegation
