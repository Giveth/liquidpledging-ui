import React, { Component } from 'react'
import { Styles, Icons, Merge, Time } from './Styles'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import Caller from './LiquidPledgingCaller'
import Funds from './Funds'
import Filter from './Filter'

class RootDelegationList extends Component {   

    render() {

        if(!this.props.delegations)
            return <div/>

        let delegationsWithAmount = Filter.byProperty(this.props.delegations, 'availableAmount',0, true)
            
        let list = delegationsWithAmount.map((d,index) => {
        
            let that = this

            function onPledges()
            {
                that.props.onPledges(d)
            }

            let canCancel = true
            let canDelegate = false
    
            if(d.type==="Project")
                canDelegate = false
    
            let cancelDelegateButton = <div style = {Styles.emptyButton} />
            let delegateFundsButton = <div style = {Styles.emptyButton} />

            let onCancel=()=>
            {
                let data = {delegation:d, node:this.props.node}
                Caller.showCancelDialog(data)
            }
    
            if(canDelegate){
                delegateFundsButton = (
                <IconButton
                    onClick = {this.onAddButton}
                    style = {{color:'grey'}}
                    tooltip = {'Delegate funds to '+d.name}
                    >
                    <Icons.add size={15}/>
                </IconButton>)
            }
            
            if(canCancel){
                cancelDelegateButton=(
                //icon button
                /*<IconButton
                    onClick = {this.onCancel}
                    style = {{color:'grey'}}
                    tooltip = {'Cancel funding to '+d.name}
                    >
                    <Icons.cancel size={15}/>
                </IconButton>)*/
                //text button
                <FlatButton
                    onClick = {onCancel}
                    secondary = {false}
                    label={'Cancel'}
                    labelStyle = {{fontSize:11}}
                />)
            }
            
            let actionButons =(
                <div style = {Styles.delegation.actionButons}>
                    {cancelDelegateButton}
                    {delegateFundsButton}
                </div>)

            let amount = d.assignedAmount - d.assignedToProjectsAmount

            let timeLeft = <div/>
            if(d.type==="Project")
            {
                timeLeft = <p>{Time.humanizeTimeLeft(d.commitTime) }</p>
            }

            return (

                <div key= {"Delegation" + index} style = {Merge(Styles.card.row, Styles.card.delegation)} >
                    <div onClick = {onPledges} >{d.name}</div>
                    <div style = {Styles.row}>
                        {actionButons}
                        <div style={Styles.space}/>
                        <Funds amount = {amount}/>
                    </div>
                </div>
            )})
                /*
            <SectionHeader
                key = {'Delegation'+index}
                title={d.name}
                titleStyle =  {Merge(d.title, {paddingLeft:10})}
                amount= {amount}
                amountStyle = {Merge(Styles.delegation.title, {fontSeize:'0.8em'})}
                onPledges = {onPledges}
                showOnHovering = {true}
                >

                {actionButons}
                {timeLeft}
                
            </SectionHeader>)
            
            */
                
        
        
        return (
            <div>
                {list}
            </div>
        )
    }
}

export default RootDelegationList
