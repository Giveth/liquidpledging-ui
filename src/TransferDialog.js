import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Styles, Currency} from './Styles'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import LPState from "./LiquidPledgingState.js"

class TransferDialog extends React.Component
{
    constructor(props)
    {
        super();
        
        this.state={
            amount:'',
            okDisabled:true,
            userNodes:[],
            selectedEmiter:0
        }
    }

    componentWillReceiveProps(newProps) {
        let selectedEmiter = this.state.selectedEmiter
        if(newProps.data.emiterId>0)
            selectedEmiter = newProps.data.emiterId

        let addressFilter={adminAddress:this.props.currentAddress}
        let userNodes=LPState.getNodes(addressFilter)

        

        let sortByAmount=(a, b)=>{
            return a.availableAmount < b.availableAmount
        }

        let emiters = []
        userNodes.forEach((node)=>
        {
            let delegationsIn = LPState.getDelegations(node.delegationsIn).sort(sortByAmount)
            let totalAvailableAmount = 0
            delegationsIn.forEach((delegation)=>{totalAvailableAmount+=delegation.availableAmount})

            let emiter = {
                id:node.adminId,
                name:node.name,
                delegationsIn:delegationsIn,
                totalAvailableAmount:totalAvailableAmount
            }
            emiters.push(emiter)
        })
        
        this.setState({
            selectedEmiter:selectedEmiter,
            currentAddress:newProps.currentAddress,
            emiters:emiters
        })
    }

    onDone=()=>
    {
        let data = {}
        let delegation = this.getDelegationFromAdminId(this.state.selectedEmiter)
    
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
        let availableAmount = Currency.toEther(this.getDelegationFromAdminId(selectedEmiter).availableAmount)
        let enough = (amount <= availableAmount)
        let state= {}
        state.error = ''

        if(!enough || isNaN(amount))
            state.error = 'Not enough funds'

        this.setState(state)

        return enough
    }

    /*getDelegationFromAdminId=(adminId)=>
    {
        for(let delegation of this.props.meta.emiters)
            if(delegation.adminId === adminId)
                return delegation
        return {}
    }*/

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
        let emitersDelegations = this.props.meta.emiters
        let mergedEmiters = []

        emitersDelegations.forEach((delegation)=>
        {
            mergedEmiters.forEach((emiter)=>
            {
                if(emiter.id === delegation.adminId)
                {

                }
            })
        })

        let defaultItem =  <MenuItem key= {0} value={0} primaryText={'Delegate from...'} disabled={true} />

        if(!emitersDelegations.length)
            defaultItem =  <MenuItem key= {0} value={0} primaryText={'No available accounts'} disabled={true} />

        let emitersList = [defaultItem]
        emitersList=emitersList.concat(emitersDelegations.map((delegation, index)=>{

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