import React from 'react'
import LPState from "./LiquidPledgingState.js"
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Caller from './LiquidPledgingCaller'
import BaseDelegationPage from './BaseDelegationsPage'

class Explorer extends BaseDelegationPage {

    constructor(){
        super()

        this.state={
            network:"",
            treeChildren:[],
            filtredTree: [],
            searchValue:""
        }
    }

    setDelegations=()=>
    {
        let address = this.props.adminAddress

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
                    amount:undefined,
                    adminAddress:this.props.adminAddress
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
            <div style ={{height:this.props.height}}>
                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText={'Search'}
                    value={this.state.searchValue}
                    onChange={this.onSearchChanged}/>

                <List style={{ overflow: "auto"}}>
                    <Subheader>Choose who to delegate</Subheader>
                    {itemsList}
                </List>
            </div>
        )
    }
}

export default Explorer
