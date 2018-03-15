import React, { Component } from 'react'
import NotificationSystem from 'react-notification-system'
import Caller from './LiquidPledgingCaller'
import Snackbar from 'material-ui/Snackbar'


class Notifications extends Component {

    constructor()
    {
        super()
        this.notifications = null
        Caller.on(Caller.SHOW_NOTIFICATION, this.showNotification)
        Caller.on(Caller.CLOSE_NOTIFICATION, this.closeNotifcation)

        this.state={
            snackbarOpen:false,
            snackbarMessage:'',
            snackBarTime:6000,
        }
    }

    showNotification=(data)=> {
     
      this.notifications.addNotification({
            title:data.title,
            message: data.message,
            level: 'success',
            position:'bl',
        })

        this.setState({
            snackbarMessage:data.message,
            snackbarTime:5000,
            snackbarOpen:true
        })
    }

    closeNotifcation=(data)=> {
     
        this.notifications.removeNotification({
          message: data.message,
          level: 'success'
        })

        this.setState({
            snackbarOpen:false,
            snackbarMessage:"",
            snackBarTime:0,
        } )

      }
  
    componentDidMount=()=>{
      this.notifications = this.refs.notificationSystem;
    }
  
    render() {
      return (
        <div>
            <NotificationSystem ref="notificationSystem" />
            <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    action="Ok"
                    autoHideDuration={this.state.snackBarTime}
                    onActionTouchTap={this.closeSnackbar}
                    onRequestClose={this.closeSnackbar}
                    />
        </div>
        )
    }
}

export default Notifications

