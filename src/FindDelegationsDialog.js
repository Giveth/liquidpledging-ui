import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


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
       
        let tables = []
       
        
        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={{maxWidth:'none'}}>    

            </Dialog>
        )
    }
}

export default FindDelegationsDialog;