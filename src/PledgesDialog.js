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
        let singleTable = true

        
        if(this.props.data && this.props.data.pledgesBlocks)
        {
            if(singleTable)
            {
                let all = []
                for(let block of this.props.data.pledgesBlocks)
                {
                    all = all.concat(block.pledges)
                }

                tables = [<PledgesTable
                    key= {"Main"}
                    pledges={all}
                    title={""}/>]
            }
            else
            {
                tables = this.props.data.pledgesBlocks.map((block, index)=>{     
                    return <PledgesTable
                        key= {index}
                        pledges={block.pledges}
                        title={block.title}/>
                    })
            }    
        }
        
        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
                contentStyle={{maxWidth:'none'}}>    

                {tables}

            </Dialog>
        )
    }
}

export default TransferDialog;