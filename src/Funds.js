import React, { Component } from 'react'
import {Styles, Currency} from './Styles.js'
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
        if(Currency.toEther(props.amount)==this.state.futureAmount)
            return

        this.setState({futureAmount:Currency.toEther(props.amount)})
        this.startTimer()
    }

    startTimer=()=>
    {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick, 50);
        console.log("interval started")
    }

    tick=()=>
    {
        let delta = (this.state.futureAmount - this.state.currentAmount) * this.speed
        let newAmount = this.state.currentAmount + delta
        let proximityHigh = this.state.futureAmount + this.state.futureAmount * this.tolerance
        let proximityLow = this.state.futureAmount - this.state.futureAmount * this.tolerance 

        if(newAmount < proximityHigh  && newAmount > proximityLow )
        {
            newAmount = this.state.futureAmount
            clearInterval(this.timer)
            console.log("interval stopped")
        }

        newAmount = Math.round(newAmount*100)/100
        this.setState({currentAmount:newAmount})
    }
        
    render() {

        return  (
            <div>
                <span style = {Styles.funds.amount}>   {Currency.format(this.state.currentAmount)}  </span>
                <span style = {Styles.funds.currency}>   {Currency.symbol}  </span>
            </div>
        )
    }
}
export default Funds