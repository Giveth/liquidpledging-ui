import QueryString from 'query-string'

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
                
        for(let id in newProperties)
        {
            if(this.properties[id] !== newProperties[id])
            {
                this.properties[id] == newProperties[id]
                this.callbacks[id](newProperties[id])
            }
        }
    }

    registerProperty=(id, onChangeCallback, defaultValue = "")=>
    {
        this.callbacks[id] = onChangeCallback

        //user has defined properties in url before loading
        if(this.properties[id])
        {
            onChangeCallback(this.properties[id])
        }
        else
        {
            this.properties[id] = defaultValue
            this.setProperty(id, defaultValue)
        }
    }

    setProperty=(id, value)=>
    {
        this.properties[id]=value
        let newHash = QueryString.stringify(this.properties)
        window.location.hash=newHash
    }
}

export default new UrlRouting ()