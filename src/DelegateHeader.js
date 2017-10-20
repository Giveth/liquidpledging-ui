import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge } from './Styles'
import IconButton from 'material-ui/IconButton'

class DelegateHeader extends Component {

    constructor(props){
        super()
    }

    onToggle=()=>
    {
        this.props.onToggle(!this.props.colapsed)
    }
   
    render() {
        let tooggleIcon = <Icons.shown size={20}/>

        if(this.props.colapsed)
        {
            tooggleIcon =<Icons.colapsed size={20}/>
        }

        let colapseButton = <div/>
        if(this.props.showColapseButton)
        {
            colapseButton = (
                <IconButton
                    onClick = {this.onToggle}
                    iconStyle={{width: 16, height: 16, color:'grey'}}
                    style={{width: 32,height: 32, padding:4, margin:8}}>
                    {tooggleIcon}
                </IconButton>)
        }

        return (

                 <div style = {Merge(Styles.delegation.header, Styles.delegation.delegateHeader)}>
                   
                    <div style = {Styles.delegation.colapseButton}>
                        {colapseButton}
                    </div>

                    <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.name}
                    </p>

                    <p key = {"amount"} style = {Styles.delegation.amount} >
                        {Currency.symbol+ " "+ Currency.toEther(this.props.availableAmount) +' / '+ Currency.toEther(this.props.assignedAmount)}
                    </p>

                
            </div>
        )
    }
}

export default DelegateHeader
