import React, { Component } from 'react'
import RootDelegation from './RootDelegation'

class RootDelegationList extends Component {   
    render() {
       
        let list = []

        if(this.props.delegations)
        {
            list = this.props.delegations.map((d,index) => {
                return  <RootDelegation  delegation = {d} />})
        }
        
        return (
            <div>
                {list}
            </div>
        )
    }
}

export default RootDelegationList
