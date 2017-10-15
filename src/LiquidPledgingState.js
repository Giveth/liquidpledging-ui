import LiquidPledgingController from "./LiquidPledgingController"

const adminTypes = {GIVER:'Giver', DELEGATE:'delegate', PROJECT:'project'}

class LiquidPledgingState extends LiquidPledgingController {

    constructor()
    {
        super()
    }

    getAdmin(id)
    {
        if(!this.state.admins || id >= this.state.admins.length )
            return {}
        return this.state.admins[id]

    }

    getAdmins(filter)
    {
        let filtered = []
        if(!this.state.admins)
            return filtered

        filtered  = this.state.admins

        for (const property of Object.keys(filter)) 
            filtered = this.filterByProperty(filtered, property, filter[property])
        

        return filtered
    }

    getPledge(id)
    {
        if(!this.state.pledges || id >= this.state.pledges.length )
            return {}
        return this.state.pledges[id]

    }

    getPledges(filter)
    {
        let filtered = []
        if(!this.state.pledges)
            return filtered

        filtered  = this.state.pledges

        for (const property of Object.keys(filter))
            filtered = this.filterByProperty(filtered, property, filter[property])

        return filtered
        
    }

    filterByProperty(array, property, value)
    {
        return array.filter((element)=>{

            if(!element || !element[property])
                return false

            if(!value)
                return true

            if(element[property] === value)
                return true
                
            return false

        })
    }

    getDelegationChain()
    {

    }
}

export default new LiquidPledgingState ()