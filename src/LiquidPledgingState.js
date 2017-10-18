import LiquidPledgingController from "./LiquidPledgingController"
const Filters = require('./Filters.js');


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
            filtered = Filters.filterByProperty(filtered, property, propertiesFilter[property])
        
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

        console.log(Filters)
        let filtered  = this.state.pledges

        for (const property of Object.keys(propertiesFilter))
            filtered = Filters.filterByProperty(filtered, property, propertiesFilter[property])

        if(delegationFilter && delegationFilter.adminId)
            filtered = Filters.filterByDelegationLevel(filtered, delegationFilter.adminId, delegationFilter.level, delegationFilter.reverseLevel)

        return filtered
    }


    /*getParentPledgeChain(pledgeId, chain = [])
    {
        let pledge = this.getPledge(pledgeId)

        if(!pledge)
            return chain

        chain.push(pledge)

        if(pledge.oldPledge)
            chain = this.getDelegationChain(pledge.oldPledge, chain)

        return chain
    }*/

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
        //Let's get all the admins controled by current account
        let admins = this.getAdmins({addr:this.currentAccount})
        //for each admin we get all the pledges where he is involved

        let allPledges = []
        for(let admin of admins)
        {
            let propertiesFilter = {}
            let delegationFilter = {adminId:admin.id, level:0}
            //let delegationFilter = {adminId:admin.id}
            let pledges = this.getPledges(propertiesFilter, delegationFilter)
            allPledges.concat(pledges)
        }
        let filter={addr:this.currentAccount}
        return this.getPledges(filter)
    }

    getAvailableDelegations()
    {
        let pledges = this.getAvailablePledges()
        let delegations = this.getDelegations(pledges)
        return delegations
    }

/////////////////////////////////////////

    getOpenPledges(adminId)
    {
        let propertiesFilter = {}
        let delegationFilter = {adminId:adminId, level:0, reverseLevel:true}
        let pledges = this.getPledges(propertiesFilter, delegationFilter)
        return pledges
    }


}

export default new LiquidPledgingState ()