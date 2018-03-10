import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'

class Header extends Component
{
    render() {

        return  (
            <AppBar
                showMenuIconButton = {false}
                title={this.props.title}
                />
        )
    }
}
export default Header