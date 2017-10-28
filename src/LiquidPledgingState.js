import LiquidPledgingController from "./LiquidPledgingController"
import Formatter from './DataFormatter'
const Filter = require('./Filter.js');

class LiquidPledgingState extends LiquidPledgingController {

    //PLEDGES

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

    getPledgesFromIds(ids)
    {
       let pledges = []
        for (let id of ids)
            pledges.push(this.getPledge(id))
        return pledges
    }


    getPledgesIdsFromDelegations(delegations)
    {
        let pledgeIds = []
        for(let delegation of delegations)
            pledgeIds.push(delegation.pledgeId)
        
        return pledgeIds
    }

    //ADMINS

    getAdmins(propertiesFilter={})
    {
        let filtered  = this.admins

        for (const property of Object.keys(propertiesFilter)) 
            filtered = Filter.byProperty(filtered, property, propertiesFilter[property])
        
        return filtered
    }
    /*getAdminForLevel(pledge, level)
    {
        if(pledge.delegates.length > level)
            return pledge.delegates[pledge.delegates.length - 1 - level]
        return -1
    }*/


    //DELEGATIONS

    getDelegations(delegationsIds)
    {
        let delegations = []
        for(let id of delegationsIds)
            delegations.push(this.getDelegation(id))
        return delegations
    }

    getDelegationsByAddress(address, type)
    {
        let propertiesFilter = {}
        if(address)
            propertiesFilter.adminAddress = address
        if(type)
            propertiesFilter.type = type

        let delegations = Filter.byProperties(this.delegationsArray, propertiesFilter)
    
        return delegations
    }

    getFirstDelegationsForNodes(nodes)
    {
        let delegations = []
        for(let node of nodes)
        {
            let delegation = this.getFirstDelegationForNode(node)
            if(delegation)
                delegations.push(delegation)
        }
        
        return delegations
    }

    getFirstDelegationForNode(node)
    {
        if(!node)
            return null
        if(node.delegationsIn.length)
            return this.getDelegation(node.delegationsIn[0])
        else
            return Formatter.getRootDelegationFromNode(node) 
    }

    //DELEGATION TREES

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

        let node = this.getNode(delegation.adminId)
        
        let tree = {
            delegation:delegation,
            children:children,
            node:node
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

    getDelegationsFromTreeChildren(children, filter)
    {
        let delegations = []

        for(let child of children)
            delegations = delegations.concat(Filter.byProperties([child.delegation], filter))

        for(let child of children)
            delegations = delegations.concat( this.getDelegationsFromTreeChildren(child.children, filter))

        return delegations
    }

    getParentDelegations(delegations)
    {
        let parentDelegations = []
        for(let delegation of delegations)
            parentDelegations.push(this.getDelegation(delegation.parentId))

        return parentDelegations
    }

    //NODES

    getNodes(filter)
    {
        return Filter.byProperties(this.nodes, filter)
    }

    getNodeAssignedAmount(node)
    {
        let amount = 0
        for(let delegationId of node.delegationsIn)
            amount += this.getDelegation(delegationId).assignedAmount

        return amount
    }

    getNodeDelegatedAmount(node)
    {
        let amount = 0
        for(let delegationId of node.delegationsOut)
            amount += this.getDelegation(delegationId).assignedAmount
        
        return amount
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