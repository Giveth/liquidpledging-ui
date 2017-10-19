import React, { Component } from 'react'
import Delegation from './Delegation'
import Styles from './Styles'

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
                <div style={{paddingLeft:indentLevel* Styles.indentPadding}}>
                    {list}
                </div>
            </div>
        )
    }
}

export default DelegationList
