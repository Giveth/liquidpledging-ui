import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import UrlRouting from './UrlRouting.js'
import {Styles} from './Styles.js'
import PageColumn from './PageColumn.js'
import Drawer from 'material-ui/Drawer'

const PAGE_ID = "pageId"

class LayoutController extends Component {

    constructor(props)
    {
        super()
        this.state={
            currentTab:props.defaultTab,
            windowWidth:window.innerWidth,
            menuWidth:300
        }

        window.addEventListener('resize', ()=>{
            this.setState({windowWidth:window.innerWidth})
        })
    }

    componentWillMount=()=>
    {
        UrlRouting.registerProperty(PAGE_ID, this.onPageIdHashChanged.bind(this), this.state.currentTab)
    }

    onPageIdHashChanged=(pageId)=>
    {
        let index = this.getIndexFromPageId(pageId)
        if(index>=0)
        {
            UrlRouting.setProperty(PAGE_ID, pageId)
            this.setTab(index)
        }
        else
        {
            UrlRouting.setProperty(PAGE_ID, this.getPageIdFromIndex(this.state.currentTab))
        }
    }

    onTabChange=(index)=>
    {
        let pageId = this.getPageIdFromIndex(index)
        UrlRouting.setProperty(PAGE_ID, pageId)
        this.setTab(index)
    }

    setTab(index)
    {
        this.setState({
            currentTab: index,
          })
    }

    getIndexFromPageId=(pageId)=>
    {
        for(let i = 0; i<=this.props.length; i ++)
        {
            let item = this.props[i]
            if(item)
            {
                if(item.props.pageId === pageId)
                {
                    return i
                }  
            }
        }
        
        return -1
    }

    getPageIdFromIndex=(index)=>
    {
        if(this.props.pages[index])
            if(this.props.pages[index].props.pageId)
                return this.props.pages[index].props.pageId

        return ""
    }

    getNumberOfViews()
    {
        let n = 0
        if(this.props)
            n = 1
        if(this.props.length)
            n = this.props.length
        return n
    }

    


    render() {

        let viewsNumber = this.getNumberOfViews()
        console.log(viewsNumber, Styles.minContentWidth, this.state.windowWidth)
        let isTabLayout = ((Styles.minContentWidth * viewsNumber) > this.state.windowWidth)
        let view = <div/>

        if(viewsNumber===1)
        {
            view = this.props
        }
        else if (viewsNumber > 1)
        {
            if(false)
            {
                let tabs = this.props.map((item, index)=>
                {
                    let label = ''
                    if(item.props.label)
                        label = item.props.label

                    return (<Tab key={index} label={label} value={index}> {item} </Tab>)
                })

                view =(
                    <div style = {Styles.page.singlePage}>
                        <Tabs
                            value={this.state.currentTab}
                            onChange={this.onTabChange}>
                            {tabs}>
                        </Tabs>
                    </div>)
            }
        }

        return(
        <div style = {Styles.row}>
            
            <Drawer
                open={this.state.open}
                docket
                width = {this.state.menuWidth}>
                {this.props.menuItems}
            </Drawer>

            <div style = {{paddingLeft:this.state.menuWidth}}>
            </div>
            
        </div>)
        
    }
}

export default LayoutController

