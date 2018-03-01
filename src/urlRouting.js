import QueryString from 'query-string'
import LPState from "./LiquidPledgingState.js"
import Web3 from 'web3'

const CONTRACT = "contract"
const ACCOUNT = "account"
const PAGE = "page"

class UrlRouting {

    constructor()
    {
        this.data = {}
        this.data[CONTRACT] = ""
        this.data[ACCOUNT] = ""
        this.data[PAGE] = ""

        window.addEventListener('hashchange', this.onHashChanged, false)
        this.onHashChanged()
    }

    onHashChanged=()=>
    {
        let parsedHash = QueryString.parse(window.location.hash)

        for(let propertyName in parsedHash)
            if(this.data[propertyName] !== parsedHash[propertyName])
               this.processProperty(propertyName, parsedHash[propertyName])
    }

    setHashProperty=(name, value)=>
    {
        this.data[name] = value
        let newHash = QueryString.stringify(this.data)
        window.location.hash(newHash)
    }

    processProperty=(name,value)=>
    {
        if(name === CONTRACT)
        {
            if(Web3.utils.isAddress(value))
            {
                LPState.setContractAddress(value)
                LPState.setupWeb3()
            }
        }
        else if(name === ACCOUNT)
        {
            if(Web3.utils.isAddress(value) || value === "*")
            {
                LPState.setCurrentAccount(value)
            }
        }

    }

}

export default new UrlRouting ()