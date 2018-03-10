import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
                   
                        <LayoutController defaultTab = {0} header =  {<AddressSelector />}>
                                 
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

