import React, { Component } from 'react'
import liquidPledgingLogo from './liquid-pledging.svg'
import './App.css'
import Page from './Page'
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

class App extends Component {

    render() {
        return (
                        
            <MuiThemeProvider muiTheme={GreyTheme}>
                <div> 
                    <AddressSelector />
                    
                    <Page>

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

                        <LayoutController defaultTab = {1}>
                            <MyFunds label="My funds"/>
                           
                            <OthersFunds label="Other's funds" />
                            <MyProjects label="My projects" />
                            <Explorer label="Explorer" adminTypes={["Delegate", "Project", "Giver"]} />
                            <PledgesView label="Pledges" />

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

