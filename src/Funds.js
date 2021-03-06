import React, { Component } from 'react'
import {Styles, Currency, MergeIf} from './Styles.js'
class Funds extends Component
{
    constructor(props)
    {
        super()
        this.state={
            currentAmount:Currency.toEther(props.amount),
            futureAmount:Currency.toEther(props.amount)
        }

        this.timer = {}
        this.speed = 0.2
        this.tolerance = 0.1
    }
    
    componentWillReceiveProps=(props)=>
    {
        if(this.props.noAnimation)
        {
            this.setState({
                currentAmount:Currency.toEther(props.amount),
                futureAmount:Currency.toEther(props.amount)})
            return
        }
    
        if(Currency.toEther(props.amount)===this.state.futureAmount)
            return

        this.setState({futureAmount:Currency.toEther(props.amount)})
        this.startTimer()
    }

    startTimer=()=>
    {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick, 50);
    }

    tick=()=>
    {
        let delta = (this.state.futureAmount - this.state.currentAmount) * this.speed
        let newAmount = this.state.currentAmount + delta
        let proximityHigh = this.state.futureAmount + 0.1
        let proximityLow = this.state.futureAmount - 0.1

        if(newAmount < proximityHigh  && newAmount > proximityLow )
        {
            newAmount = this.state.futureAmount
            clearInterval(this.timer)
        }

        newAmount = Math.round(newAmount*100)/100
        this.setState({currentAmount:newAmount})
    }
        
    render() {

        let currency = <span style = {Styles.funds.currency}>   {Currency.symbol}  </span>
        if(!this.props.showCurrency)
            currency =  <span/>

        return  (
            <div style = {{paddingLeft:10, paddingRight:10}}>
                {currency}
                <span style = {MergeIf(Styles.funds.amount, {opacity:0.5}, this.state.currentAmount.toString() ==='0')}>   {Currency.format(this.state.currentAmount)}  </span>
            </div>
        )
    }
}
export default Funds