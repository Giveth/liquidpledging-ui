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
import Notifications from './Notifications.js'
import LPState from "./LiquidPledgingState.js"
import Caller from "./LiquidPledgingCaller.js"

const MY_FUNDS = "myFunds"
const OTHERS_FUNDS= "othersFunds"
const MY_PROJECTS = "myProjects"
const EXPLORER = "explorer"
const PLEDGES = "pledges"
const ABOUT = "about"

class App extends Component {

    componentWillMount()
    {
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
        LPState.on(LPState.NO_CONTRACT, this.onNoContractFound)
    }

    onNetworkChanged=()=>
    {
        Caller.showNotification({message:"Connected to " + LPState.getCurrentNetwork().name})
    }

    onNoContractFound=()=>
    {
        Caller.showNotification({message:'Invalid contract address'})
    }

    getIcon()
    {
        return( 
            <div key= 'icon' style = {{
                width:"100%",
                flexDirection: 'row',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'}}>
                
                <img
                    src={liquidPledgingLogo}
                    alt="Building the Future of Giving"
                    style={Styles.givethLogo}
                />
            </div>)
    }

    changePage=(newPageId)=>
    {
        UrlRouting.setProperty("pageId", newPageId)
    }

    getMenuItems=()=>
    {
        return [

            <div key = "AppBar" style = {Styles.appBar.menu}> {} </div> ,
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

            <MenuItem
                key = {ABOUT}>
                About
            </MenuItem>,
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

    getHeader(){
        return [
            <div key = 'Title' style = {Styles.title}>  Liquid Pledging </div>,
            <AddressSelector key = "AddressSelector" />
        ]
    }

    getContent()
    {
        return (
            <LayoutController
                key = "LayoutController"
                defaultTab = {0}
                header =  {this.getHeader()}
                menuItems = {this.getMenuItems()}
                pages = {this.getPages()}
                groups = {[[MY_FUNDS, OTHERS_FUNDS, MY_PROJECTS],[EXPLORER], [PLEDGES]]}/>
        )
    }

    render() {
        return (
                        
            <MuiThemeProvider muiTheme={GreyTheme}>
                <div>
                    {this.getContent()}
                    <Dialogs/>
                    <Notifications/>
                </div>
            </MuiThemeProvider>
            
        )
    }
}

export default App

