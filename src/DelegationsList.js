import React, { Component } from 'react'
import Delegation from './Delegation'

class DelegationList extends Component {

    constructor(props){
        super()

        this.state={
        }
    }
   
    render() {
        const list = this.props.delegations.map((delegation) => { return <Delegation/>} )

        console.log(list)
        console.log(this.props.delegations)

        return (
            <div >
                {list}
            </div>
        )
    }
}

export default DelegationList
