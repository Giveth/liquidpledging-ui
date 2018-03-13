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
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import UrlRouting from './UrlRouting.js'
import AppBar from './AppBar.js'


const MY_FUNDS = "myFunds"
const OTHERS_FUNDS= "othersFunds"
const MY_PROJECTS = "myProjects"
const EXPLORER = "explorer"
const PLEDGES = "pledges"

class App extends Component {

    getIcon()
    {
       return( <div key = "icon" style={{textAlign: 'center'}}>
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

    changePage=(newPageId)=>
    {
        UrlRouting.setProperty("pageId", newPageId)
    }

    getMenuItems=()=>
    {
        return [

            <AppBar/> ,
            this.getIcon(),
            <Divider key = "d0"/>,
            <Subheader key = "a0" >Wallet</Subheader>,
            <MenuItem
                key = {MY_FUNDS}
                onClick = {()=>this.changePage(MY_FUNDS)}>
                My Funds
            </MenuItem>,

            <MenuItem
                key = {OTHERS_FUNDS}
                onClick = {()=>this.changePage(OTHERS_FUNDS)}>
                Other's Funds
            </MenuItem>,
            
            <MenuItem
            key = {MY_PROJECTS}
                onClick = {()=>this.changePage(MY_PROJECTS)}>
                My Projects
            </MenuItem>,

            <Divider key = "d1"/>,
            <Subheader key = "c">Contract</Subheader>,

            <MenuItem
                key = {EXPLORER} 
                onClick = {()=>this.changePage(EXPLORER)}>
                Explorer
            </MenuItem>,

            <MenuItem
                key = {PLEDGES} 
                onClick = {()=>this.changePage(PLEDGES)}>
                Pledges
            </MenuItem>,

            <Divider key = "d2" />,
            <MenuItem key = "a">About</MenuItem>,
        ]
    }

    getPages()
    {
        return [
            <MyFunds key= {MY_FUNDS} pageId = {MY_FUNDS} label="My funds"/>,
            <OthersFunds key = {OTHERS_FUNDS} pageId = {OTHERS_FUNDS} label="Other's funds" />,
            <MyProjects key = {MY_PROJECTS} pageId = {MY_PROJECTS} label="My projects" />,
            <Explorer key = {EXPLORER} pageId = {EXPLORER} label="My projects" />,
            <PledgesView key = {PLEDGES} pageId = {PLEDGES} label="My projects" />
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
                <div>
                    {this.getContent()}
                    <Dialogs/>
                </div>
            </MuiThemeProvider>
            
        )
    }
}

export default App

