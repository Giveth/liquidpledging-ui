import LiquidPledgingController from "./LiquidPledgingController"

const adminTypes = {GIVER:'Giver', DELEGATE:'delegate', PROJECT:'project'}

class LiquidPledgingState extends LiquidPledgingController {

    constructor()
    {
        super()
    }

    getAdmins(filter)
    {
        let filtered = []
        if(!this.state.admins)
            return filtered

        filtered  = this.state.admins

        console.log(filter)

        for (const property of Object.keys(filter)) {
            filtered = this.filterByProperty(filtered, property, filter[property])
        }
        
        return filtered
        
    }

    filterByProperty(admins, property, value)
    {
        return admins.filter((admin)=>{
            if(admin && admin[property] === value)
                return true
            return false
        })

    }
}

export default new LiquidPledgingState ()