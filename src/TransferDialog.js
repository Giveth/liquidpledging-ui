import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles, Currency} from './Styles'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

class DonateDialog extends React.Component
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

    onDone=()=>
    {
        let data = this.props.data
        data.amount = this.state.amount
        this.props.onDone(data)
        this.state={amount:''}
    }   

    onCancel=()=>
    {
        this.props.onCancel()
    }  

    //TODO: Check
    onTextChange = (e, newText) => {
        let state = {}

        if(!isNaN(newText))
            state.amount=newText

        if(!newText || isNaN(newText) )
            state.okDisabled=true
        else
           state.okDisabled=false

       this.setState(state)
    }

    onEmiterChanged = (event, index, selectedEmiter) =>
    {
        this.setState({selectedEmiter})
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
              label="Add funds"
              primary={true}
              keyboardFocused={true}
              onClick={this.onDone}
              disabled={this.state.okDisabled}
            />
        ]

        let title = "Delegate funds to "+ this.props.data.giverName
        let emiters = this.props.meta.emiters

        let defaultItem =  <MenuItem value={0} primaryText={'Move from?'} disabled={true} />

        if(!emiters.length)
            defaultItem =  <MenuItem value={0} primaryText={'No available accounts'} disabled={true} />

        let emitersList = [defaultItem]
        emitersList=emitersList.concat(emiters.map((delegation, index)=>{
                return <MenuItem value={delegation.id} primaryText={delegation.name} />}))

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
                    style={{width:200}}
                    autoWidth={false}>
                    {emitersList}
                </DropDownMenu>

                <TextField
                    
                    autoFocus={true}
                    id="inputText"
                    hintText={'Ether to add'}
                    value={this.state.amount}
                    onChange={this.onTextChange}/>
                   
            </Dialog>
        )
    }
}

export default DonateDialog;