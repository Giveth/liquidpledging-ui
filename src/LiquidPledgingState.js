import LiquidPledgingController from "./LiquidPledgingController"

const adminTypes = {GIVER:'Giver', DELEGATE:'delegate', PROJECT:'project'}

class LiquidPledgingState extends LiquidPledgingController {

    getAdmin(adminId)
    {
        if(!this.state.admins || adminId >= this.state.admins.length )
            return {}
        return this.state.admins[adminId]
    }

    getAdmins(propertiesFilter={})
    {
        if(!this.state.admins)
            return []

        let filtered = []

        filtered  = this.state.admins

        if(filtered.length<=1)
            return []

        filtered.shift()

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

        if(filtered<=1)
            return []

        filtered  = this.state.pledges
        filtered.shift()

        for (const property of Object.keys(propertiesFilter))
            filtered = this.filterByProperty(filtered, property, propertiesFilter[property])

        if(delegationFilter && delegationFilter.adminId)
            filtered = this.filterByDelegationLevel(filtered, delegationFilter.adminId, delegationFilter.level)

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

            if(parseInt(pledge.delegates[level].id, 10) === adminId)
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

    getDelegation(pledge, currentDelegate, children)
    {
        let delegation = {
            pledge:pledge,
            currentDelegate:currentDelegate,
            children:children
        }
        return delegation
    }

    getAdminForLevel(pledge, level)
    {
        if(pledge.delegates.length > level)
            return pledge.delegates[pledge.delegates.length - 1 - level]
        return -1
    }

    getDelegations(pledges)
    {
        let delegations = []
        for( let pledge of pledges)
        {
            let admin = this.getAdmin(pledge)
            delegations.push(this.getDelegation(pledge, this.getAdminForLevel(pledge, 0)))
        }
        return delegations
    }

    getAvailablePledges()
    {
        let admins = this.getAdmins({addr:this.currentAccount})

        console.log("AvailbleAdmins", admins)
        let filter={addr:this.currentAccount}
        return this.getPledges(filter)
    }

    getAvailableDelegations()
    {
        console.log("Fet")
        let pledges = this.getAvailablePledges()
        let delegations = this.getDelegations(pledges)
        return delegations
    }

    getIdsFrom(admins)
    {
        let ids = []
        for(let admin of admins)
            ids.push(admin)
    }

}

export default new LiquidPledgingState ()