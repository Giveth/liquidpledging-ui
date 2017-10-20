import React, { Component } from 'react'
import DelegationsList from './DelegationsList'
import { Styles, Format, Icons } from './Styles'
import IconButton from 'material-ui/IconButton'
import GiverHeader from './GiverHeader'
import DelegateHeader from './DelegateHeader'

class Delegation extends Component {

    constructor(props){
        super()

        this.state={
            isColapsed:true
        }
    }

    onHeaderToggle=(colapsed)=>
    {
        this.setState({
            isColapsed : colapsed
        })
    }
   
    render() {

        let indentLevel = this.props.indentLevel
        let tooggleIcon = <Icons.colapsed size={20}/>
        let children = <div style = {Styles.delegation.bodyColapsed}>
                <DelegationsList
                    treeChildren={this.props.tree.children}
                    indentLevel={indentLevel}
                />
            </div>

        if(this.state.isColapsed)
        {
            tooggleIcon =<Icons.shown size={20}/>
            children = <div style = {Styles.delegation.bodyShown}>
                <DelegationsList
                    treeChildren={this.props.tree.children}
                    indentLevel={indentLevel}
                />
            </div>
        }

        let colapseButton = <div/>
        if(this.props.tree && this.props.tree.children && this.props.tree.children.length)
        {
            colapseButton = (
                <IconButton
                    onClick = {this.onTooggleChildren}
                    iconStyle={{width: 16, height: 16, color:'grey'}}
                    style={{width: 32,height: 32, padding:4, margin:8}}>
                    {tooggleIcon}
                </IconButton>)
        }

        let header = <DelegateHeader 
            id={this.props.tree.delegation.id}
            name={this.props.tree.delegation.name}
            assignedAmount = {this.props.tree.delegation.assignedAmount}
            availableAmouont = {this.props.tree.delegation.availableAmount}
            adminAddress = {this.props.tree.delegation.adminAddress}
            userAddress={this.props.userAddress}


            showColapseButton = {(this.props.tree && this.props.tree.children && this.props.tree.children.length)}
            onToggle = {this.onHeaderToggle}
            colapsed = {this.state.isColapsed}
            />

        if(this.props.tree.delegation.type == "Giver")
            header = <GiverHeader 
            id={this.props.tree.delegation.id}
            name={this.props.tree.delegation.name}
            assignedAmount = {this.props.tree.delegation.assignedAmount}
            availableAmount = {this.props.tree.delegation.availableAmount}
            adminAddress = {this.props.tree.delegation.adminAddress}
            adminId={this.props.tree.delegation.adminId}
            userAddress={this.props.userAddress}

            showColapseButton = {(this.props.tree && this.props.tree.children && this.props.tree.children.length)}
            onToggle = {this.onHeaderToggle}
            colapsed = {this.state.isColapsed}
            />

        return (
            <div style = {Styles.delegation.container}>
                {header}     
                {children}
            </div>
        )
    }
}

export default Delegation
