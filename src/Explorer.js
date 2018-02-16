import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import DelegationsList from './DelegationsList'
import TextField from 'material-ui/TextField'

class Explorer extends Component {

    constructor(){
        super()

        this.state={
            network:"",
            treeChildren:[],
            filtredTree: [],
            searchValue:""
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
        //this.setDelegations()
    }
    componentWillMount=()=>
    {
        this.setDelegations()
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

        let delegatesFilter = {type:'Delegate'}
        let delegatesNodes =  LPState.getNodes(delegatesFilter)
        let projectsFilter = {type:'Project'}
        let projectNodes =  LPState.getNodes(projectsFilter)

        //let delegations = LPState.getFirstDelegationsForNodes(projectNodes)
        let delegations = LPState.getFirstDelegationsForNodes(projectNodes.concat(delegatesNodes))
        let onlyDelegationsWithMoneyFilter= {assignedAmount:undefined}
        let myTrees = LPState.getDelegationsTrees(delegations, onlyDelegationsWithMoneyFilter)

        this.setState({
            treeChildren:myTrees,
            currentAddress:address,
            filtredTree: this.filterByText (myTrees, this.state.searchValue)
        })
    }

    filterByText=(tree, text)=>
    {
        return tree.filter((value,index, array)=>{
           return ( value.delegation.name.indexOf(text)!= -1 )
        })
    }

    onSearchChanged = (e, newText) => {
        let filteredTree = this.filterByText(this.state.treeChildren, newText)

        let state = {
            searchValue:newText,
            filtredTree: filteredTree
        }

        this.setState(state)
    }

    render() {

        return (
            <div >
                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText={'Search'}
                    value={this.state.searchValue}
                    onChange={this.onSearchChanged}/>

                <DelegationsList
                    treeChildren={this.state.filtredTree}
                    indentLevel={-1}
                    userAddress={this.state.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}
                    />
            </div>
        )
    }
}

export default Explorer
