import React from 'react'
import LPState from './LiquidPledgingState'
import PledgesTable from './PledgesTable'
import BaseDelegationPage from './BaseDelegationsPage'
import { Styles } from './Styles'
import AppBar from './AppBar'

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

        console.log(LPState.pledges)

        this.setState({
            pledges:LPState.pledges,
            currentAddress:address,
        })
    }

    render() {
        return (

            <div style = {Styles.page}>

                <AppBar>
                    <div style = {Styles.appBar.title}> {this.props.label} </div>
                </AppBar>
                

                <div style = {Styles.singlePage.body}>

                    <PledgesTable pledges = {this.state.pledges}/>

                </div>
            </div>

        )
    }
}

export default PledgesView
