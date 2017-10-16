import React, { Component } from 'react'
import Delegation from './Delegation'

class DelegationList extends Component {

    constructor(props){
        super()

        this.state={}
    }
   
    render() {

        let list = []
        if(this.props.delegations)
            list = this.props.delegations.map((d,index) => {
                return <Delegation key={index} delegation={d} />})

        console.log(this.props.delegations)
        return (
            <div >
                {list}
            </div>
        )
    }
}

export default DelegationList
