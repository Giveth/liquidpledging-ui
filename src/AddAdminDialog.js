import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles, Currency} from './Styles'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

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
        super();
        this.state={
            name:'',
            okDisabled:true,
            selectedType:0
        }
    }

    onDone=()=>
    {
        /*let data = {}
        let delegation = this.getDelegationFromId(this.state.selectedType)

        data.emiterId = delegation.adminId
        data.pledgeId = delegation.pledgeId
        data.recieverId = this.props.data.recieverId
        data.amount = parseFloat(this.state.amount,10)

        this.setState({amount:'', selectedType:0, okDisabled:true})
        this.props.onDone(data)
        */
    }   

    onCancel=()=>
    {
        this.setState({name:'', selectedType:0, okDisabled:true})
        this.props.onCancel()
    }  

    //TODO: Check
    onTextChange = (e, newText) => {
        let state = {}

        if(!isNaN(newText))
            state.name=newText
       
        state.okDisabled=!this.isReady(newText, this.state.selectedType)

       this.setState(state)
    }

    onTypeChanged = (event, index, selectedType) =>
    {
        let state = {}
        state.selectedType = selectedType
        state.okDisabled=!this.isReady(this.state.name, selectedType)
        this.setState(state)
    }

    isReady=(amount, selectedType)=>
    {
        /*if(!this.hasEnoughAmount(amount, selectedType))
            return false

        if(!amount || isNaN(amount))
            return false

        if(!selectedType)
            return false

        return true*/
        return true
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

        let typesOptions = types.map((element, index)=>{
            return <MenuItem
                key= {element.id}
                value={element.id}
                primaryText={element.label}
                disabled = {element.disabled}/>
        })

        return (
            <Dialog
                title={"New account"}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={Styles.dialogs.narrow}>

                <DropDownMenu
                    value={this.state.selectedType}
                    onChange={this.onTypeChanged}
                    autoWidth={true}>

                    {typesOptions}

                </DropDownMenu>

                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText={'Name'}
                    value={this.state.amount}
                    onChange={this.onTextChange}
                    errorText = {this.state.error}/>
            </Dialog>
        )
    }
}

export default AddAdmin;