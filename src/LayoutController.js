import React, { Component } from 'react'
import UrlRouting from './UrlRouting.js'
import {Styles,Merge} from './Styles.js'
import Drawer from 'material-ui/Drawer'
import liquidPledgingLogo from './liquid-pledging.svg'

const PAGE_ID = "pageId"

class LayoutController extends Component {

    constructor(props)
    {
        super()
        this.state={
            currentPageId:props.pages[0].props.pageId,
            windowWidth:window.innerWidth,
            menuWidth:200,
            currentPage:<div/>
        }

        window.addEventListener('resize', ()=>{
            this.setState({windowWidth:window.innerWidth})
        })
    }

    componentWillMount=()=>
    {
        UrlRouting.registerProperty(PAGE_ID, this.onPageIdHashChanged.bind(this), this.state.currentPageId)
    }

    onPageIdHashChanged=(pageId)=>
    {
        let newPage = this.getPage(pageId)

        if(!newPage)
            return

        UrlRouting.setProperty(PAGE_ID, pageId)
        this.setState({
            currentPage: newPage,
          })
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

    getPage(pageId)
    {
        for(let i = 0; i<this.props.pages.length; i++)
            if(pageId === this.props.pages[i].props.pageId)
                return this.props.pages[i]
    }

    getGroupViews(group)
    {
        let views = []
        for(let pageId of group)
            views.push(this.getPage(pageId))
        return views
    }

    getGroupFromPageId(pageId, groups)
    {
        for(let group of groups)
            for(let id of group)
                if(id === pageId)
                    return group
        return []
    }

    render() {

        let viewsNumber = this.getNumberOfViews()
        let isTabLayout = ((Styles.minContentWidth * viewsNumber) > this.state.windowWidth)

        let view = this.state.currentPage

        if(true)
            view = this.getGroupViews(this.getGroupFromPageId(this.state.currentPageId, this.props.groups))

        return(
        <div>
            
            <Drawer
                open={this.state.open}
                docket
                width = {this.state.menuWidth}>
                {this.props.menuItems}
            </Drawer>

            <div style = {Merge(Styles.canvas, {paddingLeft:this.state.menuWidth})}>
                {view}           
            </div>
            
        </div>)
        
    }
}

export default LayoutController

