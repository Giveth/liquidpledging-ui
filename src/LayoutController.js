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
        UrlRouting.registerProperty(PAGE_ID, this.onPageIdChanged.bind(this), this.state.currentTab)
    }

    onPageIdChanged=(pageId)=>
    {
        let index = this.getIndexByPageId(pageId)
        if(index>=0)
            this.onTabChange(index)
    }

    onTabChange=(value)=>
    {
        this.setState({
          currentTab: value,
        })
    }

    getIndexByPageId=(pageId)=>
    {
        for(let i = 0; i<=this.props.children.length; i ++)
        {
            let item = this.props.children[i]
            if(item.props.pageId == pageId)
               return i
        }
        
        return -1
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

