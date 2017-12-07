import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge, MergeIf } from './Styles'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'

class SectionHeader extends Component {

    constructor(props){
        super()
        this.state={isHovering:false}
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

        let amountText = Currency.symbol+Currency.format(Currency.toEther(this.props.amount))
        let button = <div/>
        let titleStyle = Styles.sectionTitle
        let amountStyle = Styles.sectionTitle

        if(this.props.buttonLabel)
            button = <FlatButton
                onClick = {this.props.onActionButton}
                secondary = {false}
                label={this.props.buttonLabel}
                labelStyle = {{fontSize:11}}
                />

        if(this.props.titleStyle)
            titleStyle = this.props.titleStyle
        
        if(this.props.amountStyle)
            amountStyle = this.props.amountStyle

        return (
                <div
                    style = {Merge(Styles.row, {height:40})}
                    onMouseEnter= {this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    >
                    <div style = {Styles.sectionFrontCell}>

                        <div style ={titleStyle}>{this.props.title}</div>

                        <IconButton
                            style = {MergeIf({color:'grey', display:'none'}, {display:'flex'}, this.state.isHovering)}
                            onClick = {this.props.onPledges}>
                            <Icons.pledges size={10}/>
                        </IconButton>

                    </div>

                    <div style = {Styles.sectionMiddleCell}>
                        
                        <div style ={Merge(amountStyle, {width:100})}>{amountText}</div>
                        {button}
                        
                    </div>
                </div>
        )
    }
}

export default SectionHeader
