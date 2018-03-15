import React, { Component } from 'react'
import Caller from './LiquidPledgingCaller'
import Snackbar from 'material-ui/Snackbar'

class Notifications extends Component {

    constructor()
    {
        super()

        Caller.on(Caller.SHOW_NOTIFICATION, this.showNotification)
        Caller.on(Caller.CLOSE_NOTIFICATION, this.closeNotifcation)

        this.state={
            open:false,
            message:'',
            time:6000,
            onAction:null,
            action:''
        }
    }

    showNotification=(data)=> {
        let action = ''
        let onAction = null

        if(data.action)
        {
            action = data.action
            onAction = data.onAction
        }

        this.setState({
            message:data.message,
            open:true,
            action: action,
            onAction: onAction
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

      return (
        <div>
            <Snackbar
                open={this.state.open}
                message={this.state.message}
                action= {this.state.action}
                autoHideDuration={this.state.time}
                onActionTouchTap={this.state.onAction} 
                onRequestClose={this.close}
                style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
                bodyStyle={{ pointerEvents: 'initial', maxWidth: 'none' }}
                />
        </div>
        )
    }   
}

export default Notifications

