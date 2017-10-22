import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Page from './Page.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Styles } from './Styles'
import GreyTheme from './GreyTheme'
import Dialogs from './Dialogs'
import MyFunds from './MyFunds.js'
import AddAdmin from './AddAdmin.js'
import OthersFunds from './OthersFunds.js'

class App extends Component {

    render() {
        return (
                        
            <MuiThemeProvider muiTheme={GreyTheme}>
                <div> 

                    <Page>
                        <div style={{textAlign: 'center'}}>
                            <img
                                src={logo}
                                className="App-logo"
                                alt="Building the Future of Giving" 
                                style={Styles.givethLogo}/>
                        </div>

                        <MyFunds/>
                    </Page>
                    
                    <AddAdmin/>

                    <Dialogs/>

                </div>
            </MuiThemeProvider>
            
        )
    }
}

export default App

