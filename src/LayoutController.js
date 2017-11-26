import React, { Component } from 'react'
import { Styles } from './Styles'
import {Tabs, Tab} from 'material-ui/Tabs'

class LayoutController extends Component {

    constructor(props)
    {
        super()
        this.state={currentTab:props.defaultTab, windowWidth:window.innerWidth}

        window.addEventListener('resize', ()=>{
            this.setState({windowWidth:window.innerWidth})
        })
    }

    onTabChange=(value)=>
    {
        this.setState({
          currentTab: value,
        });
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
                    let label = 'A'
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

