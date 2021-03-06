import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Explorer from './Explorer.js'
import {Styles} from './Styles.js'

class FindDelegationsDialog extends React.Component
{
    constructor(props)
    {
        super();
    }

    onCancel=()=>
    {
        this.props.onCancel()
    } 
    
    render()
    {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.onCancel}
            />
        ]

        let title = "Pledges for "+this.props.data.title
        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={Styles.dialogs.fit}
                autoScrollBodyContent={false}>
               
                <div style = {{overflow:'auto'}}>
                    <Explorer
                        label="Explorer"
                        onCancel = {this.props.onCancel}
                        emiterId = {this.props.data.emiterId}
                        adminTypes = {this.props.data.adminTypes}
                        adminAddress = {this.props.data.adminAddress}
                        height = {500}/>
                </div>

            </Dialog>

        )
    }
}

export default FindDelegationsDialog;