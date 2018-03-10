import React, { Component } from 'react'
import liquidPledgingLogo from './liquid-pledging.svg'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Styles } from './Styles'
import GreyTheme from './GreyTheme'
import Dialogs from './Dialogs'
import MyFunds from './MyFunds'
import MyProjects from './MyProjects'
import AddAdmin from './AddAdmin'
import OthersFunds from './OthersFunds'
import Explorer from './Explorer'
import LayoutController from './LayoutController'
import PledgesView from './PledgesView'
import AddressSelector from './AddressSelector'
//import UrlRouting from './UrlRouting'

class App extends Component {

    render() {
        return (
                        
            <MuiThemeProvider muiTheme={GreyTheme}>
                <div> 
                    <AddressSelector />
                
                        <div style={{textAlign: 'center'}}>
                            <img
                                src={liquidPledgingLogo}
                                alt="Building the Future of Giving"
                                style={Styles.givethLogo}
                                />
                                 <h2 style = {{
                                    fontWeight: 200,
                                    textTransform: 'uppercase',
                                    color:'grey'
                                 }}> Liquid Pledging </h2>
                        </div>

                        <LayoutController defaultTab = {0}>
                            <MyFunds pageId = "myFunds" label="My funds"/>
                            <OthersFunds pageId = "othersFunds" label="Other's funds" />
                            <MyProjects pageId = "myProjects" label="My projects" />
                        </LayoutController>

                   
                    
                    <AddAdmin/>
                    <Dialogs/>

                </div>
            </MuiThemeProvider>
            
        )
    }
}

export default App

