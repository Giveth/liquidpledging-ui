import React, { Component } from 'react'
import SectionHeader from './SectionHeader'
import { Styles, Icons, Merge } from './Styles'
import IconButton from 'material-ui/IconButton'

class RootDelegationList extends Component {   

    render() {

        if(!this.props.delegations)
            return <div/>
            
        
        let list = this.props.delegations.map((d,index) => {
        
            let that = this

            function onPledges()
            {
                that.props.onPledges(d)
            }

            let canCancel = true
            let canDelegate = true
    
            if(d.type==="Project")
                canDelegate = false
    
            let cancelDelegateButton = <div style = {Styles.emptyButton} />
            let delegateFundsButton = <div style = {Styles.emptyButton} />
    
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
                <IconButton
                    onClick = {this.onCancel}
                    style = {{color:'grey'}}
                    tooltip = {'Cancel funding to '+d.name}
                    >
                    <Icons.cancel size={15}/>
                </IconButton>)
            }
            
            let actionButons =(
                <div style = {Styles.delegation.actionButons}>
                    {cancelDelegateButton}
                    {delegateFundsButton}
                </div>)

            let amount = d.assignedAmount - d.assignedToProjectsAmount

            return (
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
                
            </SectionHeader>)
                
        })
        
        return (
            <div>
                {list}
            </div>
        )
    }
}

export default RootDelegationList
