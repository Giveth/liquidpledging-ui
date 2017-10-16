import LiquidPledgingController from "./LiquidPledgingController"

const adminTypes = {GIVER:'Giver', DELEGATE:'delegate', PROJECT:'project'}

class LiquidPledgingState extends LiquidPledgingController {

    constructor()
    {
        super()
    }

    getAdmin(adminId)
    {
        if(!this.state.admins || adminId >= this.state.admins.length )
            return {}
        return this.state.admins[adminId]
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

    getPledge(pledgeId)
    {
        if(!this.state.pledges || pledgeId >= this.state.pledges.length )
            return {}
        return this.state.pledges[pledgeId]
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

    getParentPledgeChain(pledgeId, chain = [])
    {
        let pledge = this.getPledge(pledgeId)

        if(!pledge)
            return chain

        chain.push(pledge)

        if(pledge.oldPledge)
            chain = this.getDelegationChain(pledge.oldPledge, chain)

        return chain
    }


    getChildrenPledgeChain(pledgeId, pledgeTree = [])
    {
        let pledge = this.getPledge(pledgeId)

        if(!pledge)
            return chain

        chain.push(pledge)

        if(pledge.oldPledge)
            chain = this.getDelegationChain(pledge.oldPledge, chain)

        return chain
    }

    getChildrenPledges(pledgeId)
    {
        return this.getPledges({oldPledge:pledgeId})
    }

    

}

export default new LiquidPledgingState ()