import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'

class AppBar extends Component
{
    render() {

        return  (
            <div   style = {{
                backgroundColor:"grey",
                height:25,
                margin:0,
                padding:20}}>
                <p style= {{
                    margin:0,
                    fontSize: "1.2 em",
                    fontWeight:200,
                    textTransform:"uppercase",
                    color:"white"}}>
                    {this.props.title}
                </p>
            </div>
        )
    }
}
export default AppBar