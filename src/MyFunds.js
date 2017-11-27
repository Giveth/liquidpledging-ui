import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import GiverCard from './GiverCard'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import { Styles, Currency, Icons } from './Styles'

class MyFunds extends Component {

    constructor(){
        super()

        this.state={
            giverNodes:[],
            currentAddress:''
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
    }

    onStateChanged=()=>{
        this.setDelegations()
    }

    onAccountChanged=()=>{
        this.setDelegations()
    }

    onNetworkChanged=()=>{
        this.setDelegations()
    }

    setDelegations=()=>{
        let currentAddress = LPState.getCurrentAccount()
        let myGiversFilter = {adminAddress:currentAddress, type:'Giver'}
        let giverNodes = LPState.getNodes(myGiversFilter)

        this.setState({
            giverNodes:giverNodes,
            currentAddress:currentAddress
        })
    }

    onNewGiver=()=>
    {
        console.log("hello")
    }

    createGiverCards=()=>
    {
        let cards = []
        for(let giverNode of this.state.giverNodes)
        {
            let delegations = LPState.getDelegations(giverNode.delegationsOut)
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            let delegatesChildren = LPState.getDelegationsTrees(delegations, onlyDelegationsWithMoneyFilter)

            let onlyProjectsFilter= {type:'Project'}
            let projectDelegations = LPState.getDelegationsFromTreeChildren(delegatesChildren, onlyProjectsFilter)

            let projectsChildren = LPState.getDelegationsTrees(projectDelegations)

            let card = <GiverCard
                key={giverNode.id}
                giverNode = {giverNode}
                delegatedDelegations={delegations}
                delegatesChildren={delegatesChildren}
                projectsChildren={projectsChildren}
                userAddress={this.state.currentAddress}/>

            cards.push(card)
        }
        return cards
    }

    render() {

        let cards = this.createGiverCards()

        return  (
            <div >
                <div>
                    <FlatButton onClick = {this.onNewGiver} primary = {true} label="New Giver"  />
                    
                    <IconButton
                        style = {{float: 'right', color:'grey'}}
                        onClick = {this.onPledges}>
                        <Icons.pledges size={15}/>
                    </IconButton>


                </div>
                 {cards}
            </div>
        )

    }
}
export default MyFunds
