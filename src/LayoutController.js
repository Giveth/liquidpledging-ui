import React, { Component } from 'react'
import UrlRouting from './UrlRouting.js'
import {Styles,Merge, Global} from './Styles.js'

const PAGE_ID = "pageId"

class LayoutController extends Component {

    constructor(props)
    {
        super()
        this.state={
            currentPageId:props.pages[0].props.pageId,
            windowWidth:window.innerWidth,
            menuWidth:150,
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
            currentPageId: pageId,
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
        let view = this.state.currentPage
        let currentGroup = this.getGroupFromPageId(this.state.currentPageId, this.props.groups)
        let multiViewWidth = ((Styles.minContentWidth + 40) * currentGroup.length)
        let availableWidth = this.state.windowWidth - this.state.menuWidth
        let isTabLayout = availableWidth > multiViewWidth
        
        let isMobile = this.state.windowWidth < Global.smallTrigger

        let menuWidth = this.state.menuWidth
        if(isMobile)
            menuWidth='100%'
        

        let menu = (
            <div key = 'Menu'  style = {Merge(Styles.drawer, {width:menuWidth})}>
                {this.props.menuItems}
            </div>)

        let header =(
            <div key = 'AppBarHeader' style = {Styles.appBar.header}>  
                {this.props.header}
            </div>
        )

        let mobileHeader =(
            <div key = 'AppBarHeader' style = {Styles.appBar.header}>  
                {this.props.mobileHeader}
            </div>
        )
        
        if(isTabLayout)
            view = this.getGroupViews(currentGroup)

        if(isMobile)
        {
            let content = view
            if(this.props.mobileMenuIsOn)
               content = menu

            return(
                <div key = 'Main'>                   
                    <div key = 'Content' style ={Styles.page}>
                        {mobileHeader} 
                        {content}
                    </div>
                </div>
            )
        }
        else
        {
            return(
                <div key = 'Main'>
                
                    {header}         
                    
                    <div key = 'Content' style ={Styles.row}>
                        {menu}
                        <div key = 'Canvas' style = {Styles.canvas}>
                            {view}           
                        </div>
                        
                    </div>
                </div>
                
            )
        }
         }
}

export default LayoutController

