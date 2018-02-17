import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles, Currency} from './Styles'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

class TransferDialog extends React.Component
{
    constructor(props)
    {
        super();
        
        this.state={
            amount:'',
            okDisabled:true,
            selectedEmiter:0
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.data.emiterId>0)
            this.setState({selectedEmiter:newProps.data.emiterId})
    }

    onDone=()=>
    {
        let data = {}
        let delegation = this.getDelegationFromId(this.state.selectedEmiter)
    
        data.emiterId = delegation.adminId
        data.pledgeId = delegation.pledgeId
        data.recieverId = this.props.data.recieverId
        data.amount = parseFloat(this.state.amount,10)

        this.setState({amount:'', selectedEmiter:0, okDisabled:true})
        this.props.onDone(data)
    }   

    onCancel=()=>
    {
        this.setState({amount:'', selectedEmiter:0, okDisabled:true})
        this.props.onCancel()
    }  

    //TODO: Check
    onTextChange = (e, newText) => {
        let state = {}

        if(!isNaN(newText))
            state.amount=newText
       
        state.okDisabled=!this.isReady(newText, this.state.selectedEmiter)

       this.setState(state)
    }

    onEmiterChanged = (event, index, selectedEmiter) =>
    {
        let state = {}
        state.selectedEmiter = selectedEmiter
        state.okDisabled=!this.isReady(this.state.amount, selectedEmiter)
        this.setState(state)
    }

    isReady=(amount, selectedEmiter)=>
    {
        if(!this.hasEnoughAmount(amount, selectedEmiter))
            return false

        if(!amount || isNaN(amount))
            return false

        if(!selectedEmiter)
            return false

        return true
    }

    hasEnoughAmount=(amount, selectedEmiter)=>
    {
        let availableAmount = Currency.toEther(this.getDelegationFromId(selectedEmiter).availableAmount)
        let enough = (amount <= availableAmount)
        let state= {}
        state.error = ''

        if(!enough || isNaN(amount))
            state.error = 'Not enough funds'

        this.setState(state)

        return enough
    }

    getDelegationFromId=(delegationId)=>
    {
        for(let delegation of this.props.meta.emiters)
            if(delegation.id === delegationId)
                return delegation
        return {}
    }

    render()
    {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.onCancel}
            />,
            <FlatButton
              label="Delegate funds"
              primary={true}
              keyboardFocused={true}
              onClick={this.onDone}
              disabled={this.state.okDisabled}
            />
        ]

        let title = "Delegate funds to "+ this.props.data.giverName
        let emiters = this.props.meta.emiters

        let defaultItem =  <MenuItem key= {0} value={0} primaryText={'Delegate from...'} disabled={true} />

        if(!emiters.length)
            defaultItem =  <MenuItem key= {0} value={0} primaryText={'No available accounts'} disabled={true} />

        let emitersList = [defaultItem]
        emitersList=emitersList.concat(emiters.map((delegation, index)=>{

            let label = delegation.name+ " ("+Currency.symbol+" "+Currency.toEther(delegation.availableAmount)+")"
           
            return <MenuItem
                key= {delegation.adminId}
                value={delegation.adminId}
                primaryText={label} />
        }))

        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={Styles.dialogs.narrow}>

                <DropDownMenu
                    value={this.state.selectedEmiter}
                    onChange={this.onEmiterChanged}
                    autoWidth={true}>

                    {emitersList}

                </DropDownMenu>

                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText={'Ether to delegate'}
                    value={this.state.amount}
                    onChange={this.onTextChange}
                    errorText = {this.state.error}/>
            </Dialog>
        )
    }
}

export default TransferDialog;