import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import WrapperTest from './WrapperTest.js'
import Page from './Page.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    constructor()
    {
        super() 
    }


    render() {
        return (
            <div>
                
                <MuiThemeProvider>
                    <Page>
                        <WrapperTest/>
                    </Page>
                </MuiThemeProvider>
               
            </div>
        )
    }
}

export default App


/*
<header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Liquid Pledging</h1>
                </header>
                */