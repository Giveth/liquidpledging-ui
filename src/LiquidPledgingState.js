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
        let filtered  = this.state.admins

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
        let filtered  = this.state.pledges

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
        //Let's get all the admins controled by user address
        let admins = this.getAdmins({addr:this.currentAccount})
        console.log('admins', admins)
        //for each admin we get all the pledges where he is in control

        let allPledges = []
        for(let admin of admins)
        {
            let propertiesFilter = {}
            let delegationFilter = {adminId:admin.id, level:0}
            let pledges = this.getPledges(propertiesFilter, delegationFilter)
            console.log(admin.id, pledges)
            allPledges.concat(pledges)
        }
        let filter={addr:this.currentAccount}
        return this.getPledges(filter)
    }

    getAvailableDelegations()
    {
        let pledges = this.getAvailablePledges()
        console.log(pledges)
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