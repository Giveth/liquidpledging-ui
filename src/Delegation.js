import React, { Component } from 'react'
import DelegationsList from './DelegationsList'
import { Styles } from './Styles'
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
        let children = <div style = {Styles.delegation.bodyColapsed}>
                <DelegationsList
                    treeChildren={this.props.tree.children}
                    indentLevel={indentLevel}
                />
            </div>

        if(this.state.isColapsed)
        {
            children = <div style = {Styles.delegation.bodyShown}>
                <DelegationsList
                    treeChildren={this.props.tree.children}
                    indentLevel={indentLevel}
                />
            </div>
        }

        let header = <DelegateHeader 
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

        if(this.props.tree.delegation.type === "Giver")
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
