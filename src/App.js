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

    constructor()
    {
        super()
        this.state={mobileMenuIsOn:true}
        this.currentAddress = LPState.getCurrentAccount()
    }

    componentWillMount()
    {
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)
        LPState.on(LPState.NO_CONTRACT, this.onNoContractFound)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
    }

    componentDidMount()
    {
        this.currentAddress = LPState.getCurrentAccount()
        if(!this.currentAddress)
            Caller.showNotification({message:"No account available. Try to unlock it..."})
    }

    onNetworkChanged=()=>
    {
        Caller.showNotification({message:"Connected to " + LPState.getCurrentNetwork().name})
    }

    onNoContractFound=()=>
    {
        Caller.showNotification({message:'Invalid contract address'})
    }

    onAccountChanged=(account)=>
    {
        if(!this.currentAddress)
            if(account)
                Caller.showNotification({message:"Using "+account})
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
        this.setState({mobileMenuIsOn:false})
    }

    showMenu=()=>
    {
        this.setState({mobileMenuIsOn:true})
    }

    getMenuItems=()=>
    {
        return [

            <div key = "AppBar" style = {Styles.appBar.menu}> {} </div> ,
            this.getIcon(),
            <Divider key = "d0"/>,
            <Subheader style = {Styles.appBar.menuItem} key = "a0" >Wallet</Subheader>,
            <MenuItem
                style = {Styles.appBar.menuItem}
                key = {MY_FUNDS}
                onClick = {()=>this.changePage(MY_FUNDS)}>
                My Funds
            </MenuItem>,

            <MenuItem
                style = {Styles.appBar.menuItem}
                key = {OTHERS_FUNDS}
                onClick = {()=>this.changePage(OTHERS_FUNDS)}>
                Other's Funds
            </MenuItem>,
            
            <MenuItem
                style = {Styles.appBar.menuItem}
                key = {MY_PROJECTS}
                onClick = {()=>this.changePage(MY_PROJECTS)}>
                My Projects
            </MenuItem>,

            <Divider key = "d1"/>,
            <Subheader key = "c" style = {Styles.appBar.menuItem}>Contract</Subheader>,

            <MenuItem
                style = {Styles.appBar.menuItem}
                key = {PLEDGES} 
                onClick = {()=>this.changePage(PLEDGES)}>
                Pledges
            </MenuItem>,

            /*
            <MenuItem
                key = {EXPLORER} 
                onClick = {()=>this.changePage(EXPLORER)}>
                Explorer
            </MenuItem>,
            
            <Divider key = "d2" />,

            <MenuItem
                key = {ABOUT}>
                About
            </MenuItem>,*/
        ]
    }

    getPages()
    {
        return [
            <MyFunds key= {MY_FUNDS} pageId = {MY_FUNDS} label="My funds"/>,
            <OthersFunds key = {OTHERS_FUNDS} pageId = {OTHERS_FUNDS} label="Other's funds" />,
            <MyProjects key = {MY_PROJECTS} pageId = {MY_PROJECTS} label="My projects" />,
            <Explorer key = {EXPLORER} pageId = {EXPLORER} label="My projects" />,
            <PledgesView key = {PLEDGES} pageId = {PLEDGES} label="Contact Pledges" />
        ]
    }

    getHeader(){
        return [
            <div key = 'Title' style = {Styles.title}>  Liquid Pledging </div>,
            <AddressSelector key = "AddressSelector" />
        ]
    }

    getMobileHeader(){
        return [
            <div key = 'Title' style = {Styles.title} onClick = {this.showMenu}>  Menu </div>,
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
                mobileHeader =  {this.getMobileHeader()}
                menuItems = {this.getMenuItems()}
                mobileMenuIsOn ={this.state.mobileMenuIsOn}
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

