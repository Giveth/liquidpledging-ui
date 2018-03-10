import React, { Component } from 'react'
import {Styles} from './Styles.js'

class PageColumn extends Component {

    constructor(props)
    {
        super()
    }

    render() {
        return (
           <div style = {Styles.pageColumn}> 
                <h3>{this.props.label}</h3>
                {this.props.children}
           </div>
        )
    }
}

export default PageColumn

