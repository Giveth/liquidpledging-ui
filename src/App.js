import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import GreyTheme from './GreyTheme'
import Dialogs from './Dialogs'
import MyFunds from './MyFunds'
import MyProjects from './MyProjects'
import OthersFunds from './OthersFunds'
import Explorer from './Explorer'
import LayoutController from './LayoutController'
import PledgesView from './PledgesView'
import AddressSelector from './AddressSelector.js'
import MenuItem from 'material-ui/MenuItem'
import liquidPledgingLogo from './liquid-pledging.svg'
import {Styles} from './Styles.js'


class App extends Component {

    getIcon()
    {
       return( <div style={{textAlign: 'center'}}>
                    <img
                        src={liquidPledgingLogo}
                        alt="Building the Future of Giving"
                        style={Styles.givethLogo}
                    />
                    <h4 style = {{
                            fontWeight: 200,
                            textTransform: 'uppercase',
                            color:'grey'
                        }}> Liquid Pledging </h4>
                </div>)
    }

    getMenuItems()
    {
        return [
            this.getIcon(),
            <MenuItem>Menu Item</MenuItem>,
            <MenuItem>Menu Item 2</MenuItem>
        ]
    }

    getPages()
    {
        return [
            <MyFunds pageId = "myFunds" label="My funds"/>,
            <OthersFunds pageId = "othersFunds" label="Other's funds" />,
            <MyProjects pageId = "myProjects" label="My projects" />
        ]
    }

    getContent()
    {
        return (
            <LayoutController
                defaultTab = {0}
                header =  {<AddressSelector />}
                menuItems = {this.getMenuItems()}
                pages = {this.getPages()}/>

        )
    }

    render() {
        return (
                        
            <MuiThemeProvider muiTheme={GreyTheme}>
                {this.getContent()}
                <Dialogs/>
            </MuiThemeProvider>
            
        )
    }
}

export default App

