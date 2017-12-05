import React, { Component } from 'react'
import RootDelegation from './RootDelegation'
import { Styles } from './Styles'

class RootDelegationList extends Component {

    constructor(props){
        super()

        this.state={}
    }
   
    render() {
        let indentLevel = this.props.indentLevel + 1
        let list = []

        if(this.props.treeChildren)
        {
            list = this.props.treeChildren.map((tree,index) => {
                return  <RootDelegation 
                    delegation = {tree.delegation}
                    indentLevel = {this.props.indentLevel}
                />})
        }
        
        return (
            <div style={{paddingLeft:indentLevel* Styles.indentPadding}}>
                {list}
            </div>
        )
    }
}

export default RootDelegationList
