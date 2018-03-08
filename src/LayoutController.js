import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import UrlRouting from './UrlRouting.js'
const PAGE_ID = "pageId"

class LayoutController extends Component {

    constructor(props)
    {
        super()
        this.state={
            currentTab:props.defaultTab,
            windowWidth:window.innerWidth,
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
        for(let i = 0; i<=this.props.children.length; i ++)
        {
            let item = this.props.children[i]
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
        if(this.props.children[index])
            if(this.props.children[index].props.pageId)
                return this.props.children[index].props.pageId

        return ""
    }

    getNumberOfViews()
    {
        let n = 0
        if(this.props.children)
            n = 1
        if(this.props.children.length)
            n = this.props.children.length
        return n
    }

    render() {

        let viewsNumber = this.getNumberOfViews()
        //let isTabLayout = ((Styles.minContentWidth * viewsNumber) > this.state.windowWidth)

        let view = <div/>

        if(viewsNumber===1)
        {
            view = this.props.children
        }
        else if (viewsNumber > 1)
        {
            if(true)//isTabLayout
            {
                let tabs = this.props.children.map((item, index)=>
                {
                    let label = ''
                    if(item.props.label)
                        label = item.props.label

                    return (<Tab key={index} label={label} value={index}> {item} </Tab>)
                })

                view = <Tabs value={this.state.currentTab} onChange={this.onTabChange}> {tabs} </Tabs>
            }
            else
            {
                //Make alternative layout here
            }
        }

        return (
           <div> 
                {view}
           </div>
        )
    }
}

export default LayoutController

