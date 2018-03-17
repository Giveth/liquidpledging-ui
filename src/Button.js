import React, { Component } from 'react'
import { Styles } from './Styles'
import FlatButton from 'material-ui/FlatButton'

class Button extends Component {   

    render() {

        let label = this.props.label
        if (this.props.icon)
            label = undefined

        return (

            <FlatButton
                onClick = {this.props.onClick}
                secondary = {false}
                label={this.props.label}
                labelStyle = {{color:'grey'}}
                disabled = {this.props.disabled}
                icon = {<div style = {{color:'grey', margin:0}} >{this.props.icon}</div>}/>
        )
    }
}

export default Button
