import React, { Component } from 'react'

import { Styles } from './Styles'

class Page extends Component
{
    render(){

        return (
            <div>
                <div style={Styles.page.center}>                     
                    <div style={Styles.page.container}> 
                         
                         {this.props.children}

                     </div>                             
                </div>
            </div>
        )
    }
}

export default Page
