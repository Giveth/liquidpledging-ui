import React, { Component } from 'react'
import RootDelegation from './RootDelegation'

class RootDelegationList extends Component {   
    render() {
       
        let list = []

        if(this.props.treeChildren)
        {
            list = this.props.treeChildren.map((tree,index) => {
                return  <RootDelegation  delegation = {tree.delegation} />})
        }
        
        return (
            <div>
                {list}
            </div>
        )
    }
}

export default RootDelegationList
