import React, { Component } from 'react'
import { Styles, Icons, Merge, Time } from './Styles'
import IconButton from 'material-ui/IconButton'
import Button from './Button'
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

            let onCancel=()=>
            {
                let data = {delegation:d, node:this.props.node}
                Caller.showCancelDialog(data)
            }
            
            let actionButons =[]
    
            if(d.type==="Project")
            {
                let timeLeft = <div key = 'time' style = {{paddingLeft:10, paddingRight:10}}>{'Secured '+Time.humanizeTimeLeft(d.commitTime)}</div>
                actionButons.push(timeLeft)
            }
            
            let cancelDelegateButton =(<Button
                key = "CancelButton"
                onClick = {onCancel}
                label='Cancel'
                icon ={ <Icons.cancel/>}
            />)
        
            actionButons.push(cancelDelegateButton)
            
            let amount = d.assignedAmount - d.assignedToProjectsAmount

            return (

                <div key= {"Delegation" + index} style = {Merge(Styles.card.row, Styles.card.delegation)} >
                    <div key = 'label' onClick = {onPledges} >{d.name}</div>
                    <div  key = 'content' style = {Styles.row}>

                        <div key = 'actionButtons' style = {Styles.row}>
                            {actionButons}      
                        </div>
                        
                        <Funds amount = {amount}/>
                        
                     </div>
                </div>
            )})     
        
        return (
            <div>
                {list}
            </div>
        )
    }
}

export default RootDelegationList
