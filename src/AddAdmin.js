import React, { Component } from 'react'
import { Styles, Icons, Merge } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'
import FloatingActionButton from 'material-ui/FloatingActionButton';

class AddAdmin extends Component {

    constructor(props){
        super()
    }

    onAddButton=()=>
    {
        Caller.showAddAdminDialog()
    }
    
    render() {

        return (

            <div style = {{backgroundColor:'red'}}>

                <FloatingActionButton
                    onClick = {this.onAddButton}
                    mini={false}
                    disabled={false}
                    style={Styles.floatingBottomRight}>
                    <Icons.addAdmin size={28}/>

                </FloatingActionButton>

            </div>
        )
    }
}

export default AddAdmin
