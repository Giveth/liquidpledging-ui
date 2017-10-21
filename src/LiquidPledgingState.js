import LiquidPledgingController from "./LiquidPledgingController"
import Formatter from './DataFormatter'
const Filter = require('./Filter.js');
const adminTypes = {GIVER:'Giver', DELEGATE:'delegate', PROJECT:'project'}

class LiquidPledgingState extends LiquidPledgingController {

    
    getAdmins(propertiesFilter={})
    {
        let filtered  = this.admins

        for (const property of Object.keys(propertiesFilter)) 
            filtered = Filter.byProperty(filtered, property, propertiesFilter[property])
        
        return filtered
    }

    /*getPledge(pledgeId)
    {
        if(!this.pledges || pledgeId >= this.pledges.length )
            return {}
        return this.pledges[pledgeId]
    }*/

    getPledges(propertiesFilter={}, delegationFilter)
    {
        let filtered  = this.pledges

        for (const property of Object.keys(propertiesFilter))
            filtered = Filter.byProperty(filtered, property, propertiesFilter[property])

        if(delegationFilter && delegationFilter.adminId)
            filtered = Filter.delegationLevel(filtered, delegationFilter.adminId, delegationFilter.level, delegationFilter.reverseLevel)

        return filtered
    }

    /*getAdminForLevel(pledge, level)
    {
        if(pledge.delegates.length > level)
            return pledge.delegates[pledge.delegates.length - 1 - level]
        return -1
    }*/

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

/////////////////////////////////////////

    /*getOpenPledges(adminId)
    {
        let propertiesFilter = {}
        let delegationFilter = {adminId:adminId, level:0, reverseLevel:true}
        let pledges = this.getPledges(propertiesFilter, delegationFilter)    
        pledges = Filter.hasIntendedProject(pledges, false)
        return pledges
    }*/

    /*getAvailableDelegations()
    {
        let pledges = this.getAvailablePledges()
        let delegations = this.getDelegationsFromPledges(pledges)
        return delegations
    }*/

    getDelegations(address, type)
    {
        let propertiesFilter = {}
        if(address)
            propertiesFilter.addr === address
        if(type)
            propertiesFilter.type === type

        let admins = this.getAdmins(propertiesFilter)
        let pledges = this.getPledges({delegates:[]}) //the ones with no delegates
        pledges = Filter.byOwners(pledges, admins)
        let delegations = this.getDelegationsFromPledges(pledges)
        let trees = this.getDelegationsTrees(delegations)
        return trees
    }

    getDelegationsFromPledges(pledges)
    {
        let delegations = []
        for (let pledge of pledges)
        {
            let delegationId = Formatter.getDelegationId(pledge.owner, pledge.delegates, pledge.intendedProject)
            let delegation = this.getDelegation(delegationId)
            delegations.push(delegation)
        }

        return delegations
    }

    getDelegationsTrees(delegations)
    {
        let trees = []
        for(let delegation of delegations)
        {
            let delegationTree = this.getDelegationTree(delegation)
            trees.push(delegationTree)
        }

        return trees
    }
}

export default new LiquidPledgingState ()