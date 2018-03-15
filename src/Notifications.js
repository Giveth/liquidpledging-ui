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
            snackbarOpen:false,
            snackbarMessage:'',
            snackBarTime:6000,
        }
    }

    showNotification=(data)=> {

        this.setState({
            snackbarMessage:data.message,
            snackbarTime:5000,
            snackbarOpen:true
        })
    }

    closeNotifcation=(data)=> {

        this.setState({
            snackbarOpen:false,
            snackbarMessage:"",
            snackBarTime:0,
        } )

      }
  
    render() {
      return (
        <div>
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

