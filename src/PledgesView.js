import React from 'react'
import LPState from './LiquidPledgingState'
import PledgesTable from './PledgesTable'
import BaseDelegationPage from './BaseDelegationsPage'

class PledgesView extends BaseDelegationPage {

    constructor(){
        super()

        this.state={
            network:'',
            pledges:[]
        }
    }

    setDelegations=()=>
    {
        let address = LPState.getCurrentAccount()

        this.setState({
            pledges:LPState.pledges,
            currentAddress:address,
        })
    }

    render() {
        return (
            <div >
                <PledgesTable pledges = {this.state.pledges}/>
            </div>
        )
    }
}

export default PledgesView
