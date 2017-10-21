
module.exports = {

    byProperty(array, property, value)
    {
        return array.filter((element)=>{

            if(!element || !element[property])
                return false

            if(!value)
                return true

            if(element[property] instanceof Array)
                if(element[property].toString() === value.toString())
                    return true

            if(element[property] === value)
                return true
                
            return false
        })
    },

    byProperties(array, propertiesFilter)
    {
        let filtered  = array

        for (const property of Object.keys(propertiesFilter))
            filtered = this.byProperty(filtered, property, propertiesFilter[property])

        return filtered
    },

    delegationLevel(pledges, adminId, level, reverseLevel = false)
    {
        if(reverseLevel)
        {
            return pledges.filter((pledge)=>{

                if(!pledge.delegates[pledge.delegates.length-1-level])
                    return false

                if(pledge.delegates[pledge.delegates.length-1-level].id === adminId)
                    return true

                return false
            })
        }
        else
        {
            return pledges.filter((pledge)=>{

                if(!pledge.delegates[level])
                    return false

                if(pledge.delegates[level].id === adminId)
                    return true

                return false
            })
        }  
    },

    hasIntendedProject(pledges, hasIntendedProject=true)
    {
        return pledges.filter((pledge)=>{
           if(pledge.intendedProject === 0)
                return !hasIntendedProject
            return hasIntendedProject
        })
    },

    byOwners(pledges, admins)
    {
        let allPledges=[]
        for(let admin of admins)
        {
            let filtered = this.byOwner(pledges, admin.id)
            allPledges=allPledges.concat(filtered)
        }
        return allPledges
    },

    byOwner(pledges, owner)
    {
        return pledges.filter((pledge)=>{
           if(pledge.owner === owner)
                return true
            return false
        })
    }

}
