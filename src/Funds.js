import React, { Component } from 'react'
import {Styles, Currency} from './Styles.js'
class Funds extends Component
{
    render() {

        return  (
            <div>
                <span style = {Styles.Funds.currency}>   {Currency.symbol}  </span>
                <span style = {Styles.Funds.amount}>   {Currency.toEther(this.props.amount)}  </span>
            </div>
        )
    }
}
export default Funds