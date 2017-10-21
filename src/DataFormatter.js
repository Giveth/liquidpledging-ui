const NO_PARENT = "0"

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

            pledge.commitTime=parseInt(pledge.commitTime,10)
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
            parentDelegates.splice(-1,1)

            let parentId = this.getDelegationId(pledge.owner, parentDelegates, 0)

            let delegationChainId =  this.getDelegationChainId(pledge.owner, pledge.delegates, pledge.intendedProject)
            let adminId =  delegationChainId[delegationChainId.length - 1]
            let parentAdminId = delegationChainId[delegationChainId.length - 2]

            if(pledge.delegates.length===0)
            {
                parentId = this.getDelegationId(0, [], 0)
                adminId = pledge.owner
                parentAdminId = NO_PARENT
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
        //we go over the just created delegations and assign them their child delegations
        for(let i = 0; i < delegationsArray.length; i++)
        {
            let current = delegationsArray[i]

            for(let j= i + 1 ; j < delegationsArray.length; j++) //current plus self
            {
                
                if(current.parentId===NO_PARENT)
                    break

                if( current.parentId === delegationsArray[j].id)
                {
                    delegationsArray[j].assignedAmount += current.assignedAmount
                    delegationsArray[j].delegations.push(current.id)

                    break //there is only one parent
                }
            }
           
            delegations[current.id] = current
        }

        return delegations
    }

    getDelegationId(owner, delegates, intendedProject)
    {
        let delegatesChain =this.getDelegationChainId(owner, delegates,intendedProject)
        return delegatesChain.toString()
    }

    getDelegationChainId(owner, delegates, intendedProject)
    {
        let delegatesChain = [owner]
        delegatesChain = delegatesChain.concat(delegates)
        if(intendedProject)
            delegatesChain = delegatesChain.concat([intendedProject])
        return delegatesChain
    }

    initNodes(admins)
    {
        let nodes = {}
        for(let admin of admins)
        {
            let nodeId = this.getNodeId(admin) //same as adminID???

            let receiver = {
                id:nodeId,
                delegationsIn:[],
                delegationsOut:[]
            }
            nodes[nodeId]=receiver
        }

        return nodes
    }

    setNodes(nodes, delegations)
    {
        for (let delegationId in delegations) {
            if (delegations.hasOwnProperty(delegationId)) {
                let d = delegations[delegationId]          
                let nodeId = parseInt(d.adminId, 10)
                nodes[nodeId].delegationsIn.push(d.id)
                nodes[nodeId].delegationsOut = nodes[nodeId].delegationsOut.concat(d.delegations)
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
