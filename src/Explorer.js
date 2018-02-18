import React, { Component } from 'react'
import LPState from "./LiquidPledgingState.js"
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Caller from './LiquidPledgingCaller'

class Explorer extends Component {

    constructor(){
        super()

        this.state={
            network:"",
            treeChildren:[],
            filtredTree: [],
            searchValue:""
        }
    }

    componentWillMount=()=>
    {
        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
        
        this.setDelegations()
    }

    componentWillUnmount=()=>
    {
        LPState.removeListener(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.removeListener(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.removeListener(LPState.NETWORK_CHANGED, this.onNetworkChanged)
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
                currentAddress:'Not connected to Ethereum...  (╯°□°)╯  ┻━┻',
            })
            return
        }

        let delegations = []

        if(this.props.adminTypes)
            this.props.adminTypes.forEach((type)=>{
                let adminTypeFilter = {type:type}
                let nodes =  LPState.getNodes(adminTypeFilter)
                delegations = delegations.concat(LPState.getFirstDelegationsForNodes(nodes))
            })

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
           return ( value.delegation.name.toLowerCase().indexOf(text.toLowerCase())!== -1 )
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

    createList(tree)
    {
        let list = []
        this.state.filtredTree.map((child)=>{

            let showTransferDialog=()=>
            {
                let transferData={
                    giverName:child.delegation.name,
                    emiterId:this.props.emiterId,
                    recieverId:child.delegation.adminId,
                    amount:undefined
                }

                if(this.props.onCancel)
                    this.props.onCancel()
                    
                Caller.showTransferDialog(transferData)
            }
            
            list.push(
                <ListItem
                    primaryText={child.delegation.name}
                    secondaryText={child.delegation.type}
                    onClick={showTransferDialog}
                    key={child.delegation.id}
                />)
            list.push(<Divider key={"d"+child.delegation.id}/>)

            return child
        })

        return list
    }

    render() {

        let itemsList = this.createList(this.state.filtredTree)

        return (
            <div >
                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText={'Search'}
                    value={this.state.searchValue}
                    onChange={this.onSearchChanged}/>

                <List style={{maxHeight: 400, overflow: "auto"}}>
                    <Subheader>Choose who to delegate</Subheader>
                    {itemsList}
                </List>
            </div>
        )
    }
}

export default Explorer
