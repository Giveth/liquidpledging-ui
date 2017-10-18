
module.exports = {

    property(array, property, value)
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

}
