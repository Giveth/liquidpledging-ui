import React, { Component } from 'react'
import DelegationsList from './DelegationsList'
import { Styles, Format, Icons } from './Styles'
import IconButton from 'material-ui/IconButton'

class Delegation extends Component {

    constructor(props){
        super()

        this.state={
            showChildren:true
        }
    }

    onTooggleChildren=()=>
    {
        this.setState({
            showChildren : !this.state.showChildren
        })
    }
   
    render() {

        let indentLevel = this.props.indentLevel

        let displayTooltip = 'Show delegations'
        let tooggleIcon = <Icons.colapse size={20}/>
        let children = <div style = {Styles.delegation.bodyColapsed}>
                <DelegationsList
                    treeChildren={this.props.tree.children}
                    indentLevel={indentLevel}
                />
            </div>

        if(this.state.showChildren)
        {
            displayTooltip = 'Hide delegations'
            tooggleIcon =<Icons.shown size={20}/>
            children = <div style = {Styles.delegation.bodyShown}>
                <DelegationsList
                    treeChildren={this.props.tree.children}
                    indentLevel={indentLevel}
                />
            </div>
        }

        let colapseButton = <div/>
        if(this.props.tree.children.length)
        {
            colapseButton = (
                <IconButton
                    tooltip={displayTooltip}
                    onClick = {this.onTooggleChildren}
                    iconStyle={{width: 16, height: 16, color:'grey'}}
                    style={{width: 32,height: 32, padding:4, margin:8}}>
                    {tooggleIcon}
                </IconButton>)
        }

        return (
            <div style = {Styles.delegation.container}>

                 <div style = {Styles.delegation.header}>
                   
                    <div style = {Styles.delegation.colapseButton}>
                        {colapseButton}
                    </div>
                    
                    <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.tree.delegation.name}
                    </p>

                    <p key = {"address"} style = {Styles.delegation.assignedAmount} >
                        {Format.toEther(this.props.tree.delegation.assignedAmount)}
                    </p>

                </div>
    
                {children}
                
            </div>
        )
    }
}

export default Delegation
