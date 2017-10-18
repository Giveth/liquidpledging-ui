import LiquidPledgingController from "./LiquidPledgingController"
const Filter = require('./Filter.js');
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
            filtered = Filter.property(filtered, property, propertiesFilter[property])
        
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
            filtered = Filter.property(filtered, property, propertiesFilter[property])

        if(delegationFilter && delegationFilter.adminId)
            filtered = Filter.delegationLevel(filtered, delegationFilter.adminId, delegationFilter.level, delegationFilter.reverseLevel)

        return filtered
    }

    getDelegation(delegationId)
    {
        return this.delegations[delegationId]
    }

    getAdminForLevel(pledge, level)
    {
        if(pledge.delegates.length > level)
            return pledge.delegates[pledge.delegates.length - 1 - level]
        return -1
    }

    getDelegationTree(delegation)
    {
        let children = []
        for( let delegationId of delegation.delegations)
        {
            let child = this.getDelegation(delegationId)
            children.push(this.getDelegationTree(child))
        }
        
        let tree = {
            delegation:delegation,
            children:children
        }
        return tree
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
        pledges = Filter.hasIntendedProject(pledges, false)
        return pledges
    }


}

export default new LiquidPledgingState ()