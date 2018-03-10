import QueryString from 'query-string'

class UrlRouting {

    constructor()
    {
        this.properties = QueryString.parse(window.location.hash)
        this.oldProperties = this.properties
        this.callbacks = {}

        window.addEventListener('hashchange', this.onHashChanged.bind(this), false)
    }

    onHashChanged()
    {
        let newProperties = QueryString.parse(window.location.hash)
                
        for(let id in newProperties)
        {
            if(this.oldProperties[id] !== newProperties[id])
            {
                this.properties[id] = newProperties[id]
                this.callbacks[id](newProperties[id])
            }
        }

        this.oldProperties = JSON.parse(JSON.stringify(this.properties))
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
            
            this.setProperty(id, defaultValue)
        }
    }

    setProperty=(id, value)=>
    {
        //this.oldProperties = JSON.parse(JSON.stringify(this.properties))
        let nextProperties  = JSON.parse(JSON.stringify(this.properties))
        nextProperties[id]=value
        let newHash = QueryString.stringify(nextProperties)
        window.location.hash=newHash
    }
}

export default new UrlRouting ()