import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Explorer from './Explorer.js'

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
                contentStyle={{maxWidth:'none'}}
                autoScrollBodyContent={false}>
               
                <div style = {{overflow:'auto'}}>
                    <Explorer
                        label="Explorer"
                        onCancel = {this.props.onCancel}
                        emiterId = {this.props.data.emiterId}/>
                </div>

            </Dialog>

        )
    }
}

export default FindDelegationsDialog;