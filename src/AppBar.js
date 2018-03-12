import React, { Component } from 'react'
import {Styles} from './Styles.js'
class AppBar extends Component
{
    render() {

        return  (
            <div style = {Styles.appBar.body}>
                <div style = {Styles.appBar.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default AppBar