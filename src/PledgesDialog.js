import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles, Currency} from './Styles'
import DropDownMenu from 'material-ui/DropDownMenu'
import PledgesTable from './PledgesTable'

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

        let title = "Pledges details"
       
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
       
        

        console.log(this.props.data.pledgesBlocks)
        

        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}
               >    

                {tables}

            </Dialog>
        )
    }
}

export default TransferDialog;