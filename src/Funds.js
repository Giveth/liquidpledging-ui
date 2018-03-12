import React, { Component } from 'react'
import {Styles, Currency} from './Styles.js'
class Funds extends Component
{
    render() {

        return  (
            <div>
                <span style = {Styles.funds.amount}>   {Currency.toEther(this.props.amount)}  </span>
                <span style = {Styles.funds.currency}>   {Currency.symbol}  </span>
            </div>
        )
    }
}
export default Funds