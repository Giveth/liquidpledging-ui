import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'

class Header extends Component
{
    render() {

        return  (
            <div   style = {{
                backgroundColor:"grey",
                height:70,
                margin:0,
                padding:20}}>
                <h3 style= {{
                    fontSize: "1 em",
                    fontWeight:200,
                    color:"white"}}>
                    {this.props.title}
                </h3>
            </div>
        )
    }
}
export default Header