import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import PledgesTable from './PledgesTable'

class TransferDialog extends React.Component
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
        
        if(this.props.data && this.props.data.pledgesBlocks)
        {

            let all = []
            for(let block of this.props.data.pledgesBlocks)
                all = all.concat(block.pledges)
        
            tables = [<PledgesTable
                key= {"Main"}
                pledges={all}
                title={""}
                selectedIds = {this.props.data.selectedIds}/>]
        }
        
        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={{maxWidth:'none', width:'90%'}} 
                >    

                {tables}

            </Dialog>
        )
    }
}

export default TransferDialog;