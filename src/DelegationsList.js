import React, { Component } from 'react'
import Delegation from './Delegation'
const INDENT_SIZE = 10

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
                return <Delegation key={index} tree={tree} indentLevel={indentLevel++}/>})

        return (
            <div >
                <div style={{paddingLeft:indentLevel*INDENT_SIZE}}>
                    {list}
                </div>
            </div>
        )
    }
}

export default DelegationList
