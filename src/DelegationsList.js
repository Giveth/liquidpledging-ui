import React, { Component } from 'react'
import Delegation from './Delegation'
import { Styles } from './Styles'

class DelegationList extends Component {

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
                return <Delegation
                    key={index}
                    tree={tree}
                    indentLevel={indentLevel}
                    userAddress={this.props.userAddress}
                    defaultColapsed ={this.props.defaultColapsed}
                    defaultColapsedRoot ={this.props.defaultColapsedRoot}
                />})
        }
        
        return (
            <div style={{paddingLeft:indentLevel* Styles.indentPadding}}>
                {list}
            </div>
        )
    }
}

export default DelegationList
