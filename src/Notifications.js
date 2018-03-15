import React, { Component } from 'react'
var NotificationSystem = require('react-notification-system')

class Notifications extends Component {

    constructor()
    {
        super()
        this.notifications = null
    }

    addNotification=(event)=> {
      event.preventDefault();
      this.notifications.addNotification({
        message: 'Notification message',
        level: 'success'
      });
    }
  
    componentDidMount=()=>{
      this.notifications = this.refs.notificationSystem;
    }
  
    render() {
      return (
        <div>
            <button onClick={this.addNotification}>Add notification</button>
            <NotificationSystem ref="notificationSystem" />
        </div>
        )
    }
}

export default Notifications

