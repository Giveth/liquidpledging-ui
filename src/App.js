import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import WrapperTest from './WrapperTest.js'
import Page from './Page.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Styles } from './Styles'
import GivethLogo from './logo.svg'
import GreyTheme from './GreyTheme'
import DonateDialog from './DonateDialog'

class App extends Component {

    constructor()
    {
        super() 
    }

    render() {
        return (
            <div>            
                <MuiThemeProvider muiTheme={GreyTheme}>
                    <Page>
                        <div style={{textAlign: 'center'}}>

                            <img
                                src={logo}
                                className="App-logo"
                                alt="Building the Future of Giving" 
                                style={Styles.givethLogo}/>
                            </div>

                        <h2 className="App-title">Liquid Pledging</h2>
                        
                        <WrapperTest/>
                    </Page>

                    <DonateDialog open={true}/>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App

