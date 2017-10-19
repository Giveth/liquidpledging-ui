import React, { Component } from 'react'
import DelegationsList from './DelegationsList'
import { Styles } from './Styles'


class Delegation extends Component {

    constructor(props){
        super()

        this.state={}
    }
   
    render() {

        let indentLevel = this.props.indentLevel

        return (
            <div style = {Styles.delegation.container}>

                 <div style = {Styles.delegation.header}>

                    {Styles.subDelegateIcon}

                    <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.tree.delegation.name}
                    </p>

                    <p key = {"address"} key = {"address"} >
                        {this.props.tree.delegation.assignedAmount}
                    </p>

                </div>
        
                 <div style = {Styles.delegation.body}>
                    <DelegationsList treeChildren={this.props.tree.children} indentLevel={indentLevel}/>

                </div>
            </div>
        )
    }
}

export default Delegation
