
module.exports = {

    byProperty(array, property, value)
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

    byDelegationLevel(array, adminId, level, reverseLevel = false)
    {
        if(reverseLevel)
        {
            return array.filter((pledge)=>{

                if(!pledge.delegates[pledge.delegates.length-1-level])
                    return false

                if(parseInt(pledge.delegates[pledge.delegates.length-1-level].id, 10) === adminId)
                    return true

                return false
            })
        }
        else
        {
            return array.filter((pledge)=>{

                if(!pledge.delegates[level])
                    return false

                if(parseInt(pledge.delegates[level].id, 10) === adminId)
                    return true

                return false
            })
        }  
    }

}
