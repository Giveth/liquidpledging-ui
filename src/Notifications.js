import React, { Component } from 'react'
import Caller from './LiquidPledgingCaller'
import Snackbar from 'material-ui/Snackbar'
import {Styles, Icons} from './Styles.js'

class Notifications extends Component {

    constructor()
    {
        super()

        Caller.on(Caller.SHOW_NOTIFICATION, this.showNotification)
        Caller.on(Caller.CLOSE_NOTIFICATION, this.closeNotifcation)

        this.state={
            open:false,
            message:'',
            time:60000,
        }
    }

    showNotification=(data)=> {
        console.error(data)

        this.setState({
            message:data.message,
            open:true
        })
    }

    closeNotifcation=(data)=> {

        this.setState({
            open:false,
            message:"",
            time:0,
        } )
    }
  
    render() {
        let content = <div>  
                {this.state.message}
             </div>

      return (
        <div>
            <Snackbar
                open={this.state.open}
                message={content}
                //action="Ok"
                autoHideDuration={this.state.time}
                onActionTouchTap={this.close} 
                onRequestClose={this.close}
                />
        </div>
        )
    }   
}

export default Notifications

