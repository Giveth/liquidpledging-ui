import React, { Component } from 'react'
import DelegationsList from './DelegationsList'
import { Styles, MergeIf} from './Styles'
import GiverDelegationHeader from './GiverDelegationHeader'
import DelegateDelegationHeader from './DelegateDelegationHeader'
import ProjectDelegationHeader from './ProjectDelegationHeader'

class Delegation extends Component {


    constructor(props){
        super()

        let colapsed = false
        if ((props.indentLevel === 0) && (!isNaN(props.defaultColapsedRoot)))
        {
            colapsed=props.defaultColapsedRoot
        }
        else if (!isNaN(props.defaultColapsed))
        {
            colapsed=props.defaultColapsed
        }

        this.state={
            isColapsed:colapsed
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
        let children = <div style = {MergeIf(Styles.delegation.body, Styles.delegation.bodyColapsed, this.state.isColapsed) }>
                <DelegationsList
                    treeChildren={this.props.tree.children}
                    indentLevel={indentLevel}
                    userAddress={this.props.userAddress}
                    defaultColapsedRoot={this.props.defaultColapsedRoot}
                    defaultColapsed={this.props.defaultColapsed}
                />
            </div>

        let hasChildren = (this.props.tree && this.props.tree.children && this.props.tree.children.length)
        
        let header = <DelegateDelegationHeader 
            delegation = {this.props.tree.delegation}
            userAddress={this.props.userAddress}
            showColapseButton = {hasChildren}
            onToggle = {this.onHeaderToggle}
            colapsed = {this.state.isColapsed}
            indentLevel = {this.props.indentLevel}
            />

        if(this.props.tree.delegation.type === "Project")
            header = <ProjectDelegationHeader 
            delegation = {this.props.tree.delegation}
            userAddress={this.props.userAddress}
            showColapseButton = {hasChildren}
            onToggle = {this.onHeaderToggle}
            colapsed = {this.state.isColapsed}
            indentLevel = {this.props.indentLevel}
            />

        if(this.props.tree.delegation.type === "Giver")
            header = <GiverDelegationHeader 
            delegation = {this.props.tree.delegation}
            userAddress={this.props.userAddress}
            showColapseButton = {hasChildren}
            onToggle = {this.onHeaderToggle}
            colapsed = {this.state.isColapsed}
            indentLevel = {this.props.indentLevel}
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
