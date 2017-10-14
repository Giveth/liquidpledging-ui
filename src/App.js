import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import WrapperTest from './WrapperTest.js'

class App extends Component {

    constructor()
    {
        super() 
    }


    render() {
        return (
            <div>
                
                <WrapperTest/>

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