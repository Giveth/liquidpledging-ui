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

    getAdmins(propertiesFilter={})
    {
        let filtered = []
        if(!this.state.admins)
            return filtered

        filtered  = this.state.admins

        for (const property of Object.keys(propertiesFilter)) 
            filtered = this.filterByProperty(filtered, property, propertiesFilter[property])
        
        return filtered
    }

    getPledge(pledgeId)
    {
        if(!this.state.pledges || pledgeId >= this.state.pledges.length )
            return {}
        return this.state.pledges[pledgeId]
    }

    getPledges(propertiesFilter={}, delegationFilter)
    {
        let filtered = []
        if(!this.state.pledges)
            return filtered

        filtered  = this.state.pledges

        for (const property of Object.keys(propertiesFilter))
            filtered = this.filterByProperty(filtered, property, propertiesFilter[property])

        if(delegationFilter && delegationFilter.adminId)
            filtered = this.filterByDelegationLevel(filtered, delegationFilter.adminId, delegationFilter.level)

        console.log(3,filtered)

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

    filterByDelegationLevel(array, adminId, level)
    {
        return array.filter((pledge)=>{

            if(!pledge || !pledge.delegates)
                return false
        
            if(!pledge.delegates[level])
                return false

            if(parseInt(pledge.delegates[level].id) === adminId)
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

    getDelegation(pledge, currentDelegate)
    {
        let delegation = {
            pledge:pledge,
            currentDelegate:currentDelegate
        }
        return delegation
    }

    getAvailablePledges()
    {
        let filter={addr:this.getCurrentAccount()}
        return this.getPledges(filter)
    }




    /*getChildrenPledgeChain(pledgeId, pledgeTree = [])
    {
        let pledge = this.getPledge(pledgeId)

        if(!pledge)
            return chain

        chain.push(pledge)

        if(pledge.oldPledge)
            chain = this.getDelegationChain(pledge.oldPledge, chain)

        return chain
    }*/



}

export default new LiquidPledgingState ()