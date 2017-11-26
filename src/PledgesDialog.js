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
             tables = this.props.data.pledgesBlocks.map((block, index)=>{

             return <PledgesTable
                key= {index}
                pledges={block.pledges}
                title={block.title}/>
             })
        }
        
        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={{width:'100%'}}>    

                {tables}

            </Dialog>
        )
    }
}

export default TransferDialog;