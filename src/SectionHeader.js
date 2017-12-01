import React, { Component } from 'react'
import { Styles, Currency, Icons } from './Styles'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'

class SectionHeader extends Component {

    constructor(props){
        super()
        this.state={isHovering:false}
    }

    onPledges=()=>
    {
        this.props.onPledges()
    }

    onActionButton=()=>
    {
        this.props.onActionButton()
    }

    onMouseEnter=()=>
    {
        this.setState({isHovering:true})
    }

    onMouseLeave=()=>
    {
        this.setState({isHovering:false})
    }

    onBackgroundClick=()=>
    {
    }
   
    render() {

        return ( 
                <div style = {Styles.row}>
                    <div style = {Styles.sectionFrontCell}>
                        <div style ={Styles.sectionTitle}>{this.props.title}</div>
                        <IconButton
                            style = {{color:'grey'}}
                            onClick = {this.onPledges}>
                            <Icons.pledges size={15}/>
                        </IconButton>
                    </div>

                    <div style = {Styles.sectionMiddleCell}>
                        <div style ={Styles.section}>{this.props.amount}</div>
                        <FlatButton onClick = {this.onActionButton} secondary = {true} label={this.props.buttonLabel}  />
                    </div>
                </div>
        )
    }
}

export default SectionHeader
