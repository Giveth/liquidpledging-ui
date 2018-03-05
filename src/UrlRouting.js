import QueryString from 'query-string'
import LPState from "./LiquidPledgingState.js"
import Web3 from 'web3'

const CONTRACT = "contract"
const ACCOUNT = "account"
const PAGE = "page"
const HASH_PROPERTY_CHANGED = "hashPropertyChanged"

class UrlRouting {

    constructor()
    {
        this.properties = QueryString.parse(window.location.hash)
        this.callbacks = {}

        window.addEventListener('hashchange', this.onHashChanged.bind(this), false)
    }

    onHashChanged()
    {
        let newProperties = QueryString.parse(window.location.hash)
        let changed = false
                
        for(let id in newProperties)
        {
            if(this.properties[id])
            {
                if(this.properties[id] !== newProperties[id])
                {
                    this.properties[id] == newProperties[id]
                    this.callbacks[id](newProperties[id])
                }
            }
        }
    }

    registerProperty=(id, onChangeCallback, defaultValue = "")=>
    {
        this.callbacks[id] = onChangeCallback

        if(this.properties[id])
            onChangeCallback(this.properties[id])
        else
            this.setProperty(id, defaultValue)
    }

    setProperty=(id, value)=>
    {
        let newProperties = JSON.parse(JSON.stringify(this.properties))
        newProperties[id] = value
        let newHash = QueryString.stringify(newProperties)
        window.location.hash=newHash
    }

    processProperty(name,value)
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