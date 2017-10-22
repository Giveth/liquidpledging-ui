import LiquidPledgingController from "./LiquidPledgingController"
import Formatter from './DataFormatter'
const Filter = require('./Filter.js');

class LiquidPledgingState extends LiquidPledgingController {

    
    getAdmins(propertiesFilter={})
    {
        let filtered  = this.admins

        for (const property of Object.keys(propertiesFilter)) 
            filtered = Filter.byProperty(filtered, property, propertiesFilter[property])
        
        return filtered
    }

    getPledge(pledgeId)
    {
        //[0]-->id 1
        let index = pledgeId-1
        return this.pledges[index]
    }

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

    getDelegationTree(delegation, childrenPropertiesFilter)
    {
        let children = []

        for( let delegationId of delegation.delegations)
        {
            let child = this.getDelegation(delegationId)
            let filtered = Filter.byProperties([child],childrenPropertiesFilter)
            if(filtered[0])
                children.push(this.getDelegationTree(filtered[0],childrenPropertiesFilter))
        }
        
        let tree = {
            delegation:delegation,
            children:children
        }
        return tree
    }

    getDelegationsTrees(delegations, childrenPropertiesFilter)
    {
        let trees = []
        for(let delegation of delegations)
        {
            let delegationTree = this.getDelegationTree(delegation, childrenPropertiesFilter)
            trees.push(delegationTree)
        }

        return trees
    }

    getDelegations(address, type)
    {
        let propertiesFilter = {}
        if(address)
            propertiesFilter.adminAddress = address
        if(type)
            propertiesFilter.type = type

        console.log(propertiesFilter)

        let delegations = Filter.byProperties(this.delegationsArray, propertiesFilter)
    
        return delegations
    }

    /*getAvailablePledges(address)
    {
        //Let's get all the admins controled by current account
        let admins = this.getAdmins({addr:address})
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

    }*/

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

    



    /*getDelegationsFromPledges(pledges)
    {
        let delegations = []
        for (let pledge of pledges)
        {
            let delegationId = Formatter.getDelegationId(pledge.owner, pledge.delegates, pledge.intendedProject)
            let delegation = this.getDelegation(delegationId)
            delegations.push(delegation)
        }

        return delegations
    }*/


}

export default new LiquidPledgingState ()