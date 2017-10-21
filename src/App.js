import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import WrapperTest from './WrapperTest.js'
import Page from './Page.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Styles } from './Styles'
import GreyTheme from './GreyTheme'
import Dialogs from './Dialogs'


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
                        
                        <WrapperTest/>
                    </Page>

                    <Dialogs/>

                </div>
            </MuiThemeProvider>
            
        )
    }
}

export default App

