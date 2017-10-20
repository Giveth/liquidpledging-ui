import React, { Component } from 'react'
import Delegation from './Delegation'
import { Styles } from './Styles'

class DelegationList extends Component {

    constructor(props){
        super()

        this.state={}
    }
   
    render() {
        let indentLevel = this.props.indentLevel
        if(!indentLevel)
            indentLevel = 0

        let list = []
        if(this.props.treeChildren)
            list = this.props.treeChildren.map((tree,index) => {
                return <Delegation
                    key={index}
                    tree={tree}
                    indentLevel={indentLevel+1}
                    userAddress={this.props.userAddress} 
                />})

        return (
            <div style={{paddingLeft:indentLevel* Styles.indentPadding}}>
                {list}
            </div>
        )
    }
}

export default DelegationList
