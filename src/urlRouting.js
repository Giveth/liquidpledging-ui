import QueryString from 'query-string'
import LPState from "./LiquidPledgingState.js"
import Web3 from 'web3'

class UrlRouting {

    constructor()
    {
        window.addEventListener('hashchange', this.onHashChanged, false);
        this.onHashChanged()
        this.data = {
            contract:"",
            network:3,
            page:1
        }
    }

    onHashChanged=()=>
    {
        let parsedHash = QueryString.parse(window.location.hash)

        for(let propertyName in parsedHash)
            this.evaluateProperty(propertyName, parsedHash[propertyName])
    }

    setHashProperty=(name, value)=>
    {
        this.data[name] = value
        let newHash = QueryString.stringify(this.data)
        window.location.hash(newHash)
    }

    evaluateProperty=(name,value)=>
    {
        if(name === 'contract')
        {
            if(!Web3.utils.isAddress(value))
            {
                console.log("Nope")
            }
            else
            {
                console.log("Yep")
                LPState.setContractAddress(value)
                LPState.setupWeb3()
            }
            
        }
    }

}

export default new UrlRouting ()