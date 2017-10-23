import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Page from './Page'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Styles } from './Styles'
import GreyTheme from './GreyTheme'
import Dialogs from './Dialogs'
import MyFunds from './MyFunds'
import AddAdmin from './AddAdmin'
import OthersFunds from './OthersFunds'
import Explorer from './Explorer'
import {Tabs, Tab} from 'material-ui/Tabs'
import LayoutController from './LayoutController'

class App extends Component {

    constructor()
    {
        super()
        this.state={currentTab:0}
    }

    onTabChange=(value)=>
    {
        this.setState({
          currentTab: value,
        });
    }

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

                        <LayoutController>

                            <MyFunds label="My funds"/>
                            <OthersFunds label="Other's funds" />
                            <Explorer label="Explorer" />

                        </LayoutController>

                    </Page>
                    
                    <AddAdmin/>

                    <Dialogs/>

                </div>
            </MuiThemeProvider>
            
        )
    }
}

export default App

