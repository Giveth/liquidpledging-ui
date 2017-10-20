import React, { Component } from 'react'
import { Styles, Format, Icons } from './Styles'
import IconButton from 'material-ui/IconButton'

class GiverHeader extends Component {

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

                 <div style = {Styles.delegation.header}>
                   
                    <div style = {Styles.delegation.colapseButton}>
                        {colapseButton}
                    </div>

                     <p key = {"id"}  style= {Styles.delegation.assignedAmount}>
                        {this.props.id}
                    </p>


                    <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.name}
                    </p>

                    <p key = {"address"} style = {Styles.delegation.assignedAmount} >
                        {Format.toEther(this.props.assignedAmount)}
                    </p>

                
            </div>
        )
    }
}

export default GiverHeader
