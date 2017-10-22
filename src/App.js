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
import Explorer from './Explorer.js'
import {Tabs, Tab} from 'material-ui/Tabs';

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

                         <Tabs
                            value={this.state.currentTab}
                            onChange={this.onTabChange}>

                            <Tab label="My funds" value={0}>
                                <MyFunds/>
                            </Tab>

                            <Tab label="Other's funds" value={1}>
                                <OthersFunds/>
                            </Tab>

                            <Tab label="Explorer" value={2}>
                                <Explorer/>
                            </Tab>

                          </Tabs>

                    </Page>
                    
                    <AddAdmin/>

                    <Dialogs/>

                </div>
            </MuiThemeProvider>
            
        )
    }
}

export default App

