import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles} from './Styles'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import LPState from "./LiquidPledgingState.js"

const types = [
    {
        id:0,
        label:'Select an account type',
        disabled:true
    },
    {
        id:1,
        label:'Giver',
        disabled:false
    },
    {
        id:2,
        label:'Delegate',
        disabled:false
    },
    {
        id:3,
        label:'Project',
        disabled:false
    }
]

class AddAdmin extends React.Component
{
    constructor(props)
    {
        super ()
        let isMergedAccounts = LPState.getIsMergedAccounts()
        let accounts = JSON.parse(JSON.stringify(LPState.getAccounts()) )
        let currentAccount = LPState.getCurrentAccount()
        let selectedType = 0
        

        if(isMergedAccounts)
            currentAccount = "*"

        if(props.data.defaultAdminType)
            selectedType = props.data.defaultAdminType

        this.state={
            name:'',
            url:'',
            okDisabled:true,
            selectedType:selectedType,
            defaultType : selectedType,
            isMergedAccounts : isMergedAccounts,
            accounts : accounts,
            selectedAccount : currentAccount
        }
    }

    onDone=()=>
    {
        let data = {}
        data.type = types[this.state.selectedType].label
        data.name = this.state.name
        data.url = this.state.url
        data.address = this.state.selectedAccount

        this.setState({name:'', url:'', selectedType:0, okDisabled:true})
        this.props.onDone(data)
    }   

    onCancel=()=>
    {
        this.setState({name:'', selectedType:0, okDisabled:true})
        this.props.onCancel()
    }  

    onNameChanged = (e, newText) => {
        let state = {}

        if(newText.length < 64)
            state.name=newText
       
        state.okDisabled=!this.isReady(this.state.selectedType, this.state.selectedAddress, state.name)

       this.setState(state)
    }

     onUrlChanged = (e, newText) => {
        let state = {}

        if(newText.length < 256)
            state.url=newText
       
         state.okDisabled=!this.isReady(this.state.selectedType,this.state.selectedAddress, this.state.name)

       this.setState(state)
    }

    onTypeChanged = (event, index, selectedType) =>
    {
        let state = {}
        state.selectedType = selectedType
        state.okDisabled=!this.isReady(selectedType,this.state.selectedAddress, this.state.name)
        this.setState(state)
    }

    onAddressChanged = (event, index, selectedAddress) =>
    {
        let state = {}
        state.selectedAccount = selectedAddress
        state.okDisabled=!this.isReady(this.state.selectedType,selectedAddress, this.state.name)
        this.setState(state)
    }

    isReady=(type, address, name)=>
    {
        if(type===0)
            return false

        if(address==="*")
            return false

        if(name.length<=0)
            return false

        return true
    }

    componentWillReceiveProps=(newProps)=>
    {
        if(newProps.data)
            if(newProps.data.defaultAdminType)
                this.setState({selectedType:newProps.data.defaultAdminType})
    } 

    getAddressSelector=()=>
    {
        let select = <MenuItem
            key= {"*"}
            value={"*"}
            disabled = {true}
            primaryText={"Select an address"} />
        
        let list = this.state.accounts.map((account, index, array)=>{
                return <MenuItem
                   key= {index}
                    value={account}
                    primaryText={ index +' - '+account} />
            })

        list.unshift(select)

        return  <DropDownMenu
                    value={this.state.selectedAccount}
                    onChange={this.onAddressChanged}
                    autoWidth={true}>
                    {list}

                 </DropDownMenu>
    }

    render()
    {
        let createLabel = "Create"
        if(this.state.selectedType !== 0)
            createLabel = "Create "+ types[this.state.selectedType].label

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.onCancel}
            />,
            <FlatButton
              label={createLabel}
              primary={true}
              keyboardFocused={true}
              onClick={this.onDone}
              disabled={this.state.okDisabled}
            />
        ]

        let title = 'Create new '+types[this.state.defaultType].label
        let typeSelector = <div/>
        if(this.state.defaultType === 0)
        {
            let title = 'Create new account'
             typeSelector =  
                <DropDownMenu
                    value={this.state.selectedType}
                    onChange={this.onTypeChanged}
                    autoWidth={true}>
                    {typesOptions}
                </DropDownMenu>
        }

        let typesOptions = types.map((element, index)=>{
            return <MenuItem
                key= {element.id}
                value={element.id}
                primaryText={element.label}
                disabled = {element.disabled}/>
        })

        let addressSelector = <div/>

        if(this.state.isMergedAccounts)
            addressSelector = this.getAddressSelector()

        
        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={Styles.dialogs.narrow}>

                {typeSelector}
                {addressSelector}

                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText={'Name'}
                    value={this.state.name}
                    onChange={this.onNameChanged}/>

                 <TextField
                    autoFocus={false}
                    id="inputText"
                    hintText={'Url'}
                    value={this.state.url}
                    onChange={this.onUrlChanged}/>

            </Dialog>
        )
    }
}

export default AddAdmin;