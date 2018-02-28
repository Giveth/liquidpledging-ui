import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles} from './Styles'

class DonateDialog extends React.Component
{
    constructor(props)
    {
        super();
        this.state={
            amount:'',
            okDisabled:true
        }
    }

    onDone=()=>
    {
        let data = this.props.data
        data.amount = parseFloat(this.state.amount,10)
        data.address = this.props.data.adminAddress
        this.props.onDone(data)
        this.state={amount:'', okDisabled:true}
    }   

    onCancel=()=>
    {
        this.setState({amount:'', okDisabled:true})
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

        let title = "Add funds to "+ this.props.data.giverName

        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={Styles.dialogs.narrow}>

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