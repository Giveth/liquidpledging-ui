const NONE = 0

class DataFormatter {

    setIds(array)
    {
       return array.map((item,index)=>{
            if(item)
            {
                item.id=index
                return item
            }
            else
            {
                return item
            }
        })
    }

    setRightTypes(pledges)
    {
        return pledges.map((pledge, index)=>{

            pledge.commmitTime=parseInt(pledge.commmitTime,10)
            pledge.intendedProject=parseInt(pledge.intendedProject,10)
            pledge.oldPledge=parseInt(pledge.oldPledge,10)
            pledge.amount=parseInt(pledge.amount,10) //it may give problems with bigNumber
            pledge.owner=parseInt(pledge.owner,10)

            pledge.delegates = pledge.delegates.map((delegate,index)=>{
                 return delegate.id=parseInt(delegate.id,10)
            })

            return pledge
        })
    }

    createDelegations(pledges, admins)
    {
        function getAdmin(adminId)
        {
            if( adminId > admins.length )
                return {}
            return admins[adminId-1]
        }

        let delegationsArray = []

        //lets create unique identifier for each pledge. And let's add al convinient data. 
        for (let i = pledges.length - 1; i >= 0; --i) {

            let pledge = pledges[i]
            
            let id = this.getDelegationId(pledge.owner, pledge.delegates, pledge.intendedProject)
            

            let parentDelegates = pledge.delegates.slice()
            if(!pledge.intendedProject)
                parentDelegates.splice(-1,1)
            let parentId = this.getDelegationId(pledge.owner, parentDelegates, 0)

            let delegationChain =  this.getDelegationChain(pledge.owner, pledge.delegates, pledge.intendedProject)

            let adminId =  delegationChain[delegationChain.length - 1]
            let parentAdminId = delegationChain[delegationChain.length - 2]

            if(pledge.delegates.length===0)
            {
                parentId = this.getDelegationId(0, [], 0)
                adminId = pledge.owner
                parentAdminId = NONE
            }

            let admin = getAdmin(adminId)

            let delegation={
                id:id,
                parentId:parentId,
                parentAdminId:parentAdminId,
                delegations:[],
                assignedAmount:pledge.amount,//pledge.amount = available amount. Down below we'll add the used one 
                availableAmount:pledge.amount,
                pledgeId:pledge.id,
                intendedProject:pledge.intendedProject,
                adminId:adminId,
                adminAddress:admin.addr,
                type:admin.type,
                name:admin.name,
                url:admin.url
               }
            
            delegationsArray.push(delegation)
        }

        let delegations = {}
        //we go over the just created delegations and assign them their child delegations and we add up to the assigned amount
        for(let i = 0; i < delegationsArray.length; i++)
        {
            let current = delegationsArray[i]

            for(let j= i + 1 ; j < delegationsArray.length; j++) //current plus self
            { 
                if(current.parentId===NONE.toString())
                    break

                if( current.parentId === delegationsArray[j].id)
                {
                    delegationsArray[j].assignedAmount += current.assignedAmount
                    delegationsArray[j].delegations.push(current.id)
                    break //delegation has one parent only
                }
            }
           
            delegations[current.id] = current
        }

        return delegations
    }

    getRootDelegationFromNode(node)
    {
        return {
            id:node.id.toString(),
            parentId:NONE.toString(),
            parentAdminId:NONE,
            delegations:node.delegationsOut,
            assignedAmount:0,
            availableAmount:0,
            pledgeId:NONE.toString(),
            intendedProject:NONE,
            adminId:node.id,
            adminAddress:node.address,
            type:node.type,
            name:node.name,
            url:node.url,
           }
    }

    getDelegationId( owner, delegates, intendedProject)
    {
        let delegatesChain = this.getDelegationChain(owner, delegates,intendedProject)
        //delegatesChain.unshift(oldPledge)
        return delegatesChain.toString()
    }

    getDelegationChain(owner, delegates, intendedProject)
    {
        let delegatesChain = []
        delegatesChain.push(owner)
        delegatesChain = delegatesChain.concat(delegates)
        if(intendedProject)
            delegatesChain.push(intendedProject)
        return delegatesChain
    }

    initNodes(admins)
    {
        let nodes = [null]
        for(let admin of admins)
        {
            let nodeId = this.getNodeId(admin) //same as adminID???

            let node = {
                id:nodeId,
                adminId:admin.id,
                adminAddress:admin.addr,
                type:admin.type,
                name:admin.name,
                url:admin.url,
                delegationsIn:[],
                delegationsOut:[],
            }
            nodes.push(node)
        }

        return nodes
    }

    setNodes(nodes, delegations)
    {
        for (let delegationId in delegations) {
            if (delegations.hasOwnProperty(delegationId)) {
        
                let d = delegations[delegationId]          
                let nodeIndex = parseInt(d.adminId, 10)
                nodes[nodeIndex].delegationsIn.push(d.id)
                nodes[nodeIndex].delegationsOut = nodes[nodeIndex].delegationsOut.concat(d.delegations)
            }
        }

        return nodes
    }

    getNodeId(admin)
    {
        return admin.id
    }

    getDelegationsArray(delegations)
    {
        let list = []
        
        for (let delegationId in delegations)
            if (delegations.hasOwnProperty(delegationId)) 
               list.push(delegations[delegationId])

        return list
    }
}

export default new DataFormatter()
