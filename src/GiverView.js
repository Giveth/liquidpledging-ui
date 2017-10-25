import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'
import {Styles, Merge, MergeIf} from './Styles'

const title = 'My funds'

class GiverView extends Component {

    constructor(){
        super()

        this.state={
            network:"",
            treeChildren:[]
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

    setDelegations=()=>
    {
        let address = LPState.getCurrentAccount()

        if(!address)
        {
            this.setState({
                treeChildren:[],
                currentAddress:'Not connected to Ethereum...  (╯°□°）╯︵ ┻━┻',
            })
            return
        }

        let myGiversFilter = {address:address, type:'Giver'}
        let myNodes =  LPState.getNodes(myGiversFilter)
        let firstNode = myNodes[0]
        let delegateChildren = []
        let projectsChildren = []

        if(firstNode)
        {
            let delegations = LPState.getDelegations(firstNode.delegationsOut)
            console.log('delegations', firstNode)
            let onlyDelegationsWithMoneyFilter = { assignedAmount:undefined}
            delegateChildren = LPState.getDelegationsTrees(delegations, onlyDelegationsWithMoneyFilter)



            let onlyProjectsFilter= {type:'Project'}
            let projectDelegations = LPState.getDelegationsFromTreeChildren(delegateChildren, onlyProjectsFilter)
            let projectsChildren = LPState.getDelegationsTrees(delegations, onlyDelegationsWithMoneyFilter)
        }

        this.setState({
            delegateChildren:delegateChildren,
            projectsChildren:projectsChildren,
            currentAddress:address,
        })
    }

    render() {

        return (
            <div >
                 <p key = {"name"}  style= {MergeIf(Styles.delegateRootTitle, Styles.adminColor, true)}>
                     {'This is a giver name'}
                </p>

                <div style ={Styles.section}>{'Delegating to..'}</div>
                <DelegationsList
                    key='Delegations'
                    treeChildren={this.state.delegateChildren}
                    indentLevel={-1}
                    userAddress={this.state.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>
                    

                <div style ={Styles.space}/>

                <div style ={Styles.section}>{'Intended projects...'}</div>

                <DelegationsList
                    key='Projects'
                    treeChildren={this.state.projectsChildren}
                    indentLevel={-1}
                    userAddress={this.state.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <div style ={Styles.space}/>


            </div>
        )
    }
}

export default GiverView
