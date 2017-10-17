import ProviderHelper from "./Web3ProviderHelper"

const liquidpledging = require('liquidpledging');
const LiquidPledging = liquidpledging.LiquidPledging;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;
//const EventEmitter = require('events')

const testRPCProvider = 'ws://localhost:8546'
const liquidPledgingContractAddress = '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24'

class LiquidPledgingController extends ProviderHelper {

    constructor()
    {
        super()
        this.interval = {}
        this.STATE_CHANGED = "stateChanged"
        this.setupWeb3()
        this.state={} 
    }

    setupWeb3(){
        this.setup([testRPCProvider]).then(()=>{

            this.setupLiquidPledging()

        }).catch((e)=>{console.error(e)})
    }

    setupLiquidPledging()
    {
        const liquidPledging = new LiquidPledging(this.web3, liquidPledgingContractAddress);
        this.liquidPledgingState = new LiquidPledgingState(liquidPledging);

        
        /*this.web3.eth.subscribe('newBlockHeaders',(err,block)=>
        {
            if (err) {
                console.error("ERROR", err);
            } else {
                //console.log("block: " + block.number )
                this.retriveStateData()
            }
        })
        */

        this.retriveStateData()

        setInterval(()=>{
            this.retriveStateData()
        }, 10000);
    }

    retriveStateData()
    {
        this.liquidPledgingState.getState()
            .then((data) => {

                this.setState(data)
                //this.setFakeState()
            })
            .catch((error)=>{console.error(error)})
    }

    setState(data)
    {
        this.state = data

        if(this.state.pledges)
            this.state.pledges=this.setIdsAndRemoveNull(this.state.pledges)

        if(this.state.admins)
            this.state.admins=this.setIdsAndRemoveNull(this.state.admins)

        console.log(this.state)

        this.emit(this.STATE_CHANGED)
    }

    getState(){
        return this.state
    }

    //TODO: Remove this function and 'fakeState' const
    setFakeState()
    {
        this.state = fakeState
        this.emit(this.STATE_CHANGED)
    }

    setIdsAndRemoveNull(array)
    {
       return array.map((item,index)=>{
            if(item)
            {
                item.id=index

                return item
            }
        })
    }
}

const fakeState = {
  "pledges": [
    null,
    {
      "delegates": [],
      "amount": "1500000000000000000",
      "owner": "1",
      "intendedProject": "0",
      "commmitTime": "0",
      "oldPledge": "0",
      "paymentState": "Pledged"
    },
    {
      "delegates": [
        {
          "id": "2",
          "addr": "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0",
          "name": "Delegate1User2"
        }
      ],
      "amount": "300000000000000000",
      "owner": "1",
      "intendedProject": "0",
      "commmitTime": "0",
      "oldPledge": "0",
      "paymentState": "Pledged"
    },
    {
      "delegates": [
        {
          "id": "2",
          "addr": "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0",
          "name": "Delegate1User2"
        },
        {
          "id": "3",
          "addr": "0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d",
          "name": "Delegate1User3"
        }
      ],
      "amount": "0",
      "owner": "1",
      "intendedProject": "0",
      "commmitTime": "0",
      "oldPledge": "0",
      "paymentState": "Pledged"
    },
    {
      "delegates": [
        {
          "id": "2",
          "addr": "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0",
          "name": "Delegate1User2"
        }
      ],
      "amount": "200000000000000000",
      "owner": "1",
      "intendedProject": "4",
      "commmitTime": "1508230664",
      "oldPledge": "0",
      "paymentState": "Pledged"
    }
  ],
  "admins": [
    null,
    {
      "type": "Giver",
      "addr": "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      "name": "Giver1User1",
      "url": "Giver1User1",
      "commitTime": "600",
      "plugin": "0x0000000000000000000000000000000000000000",
      "canceled": false
    },
    {
      "type": "Delegate",
      "addr": "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0",
      "name": "Delegate1User2",
      "url": "URLDelegate1User2",
      "commitTime": "0",
      "plugin": "0x0000000000000000000000000000000000000000",
      "canceled": false
    },
    {
      "type": "Delegate",
      "addr": "0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d",
      "name": "Delegate1User3",
      "url": "URLDelegate1User3",
      "commitTime": "0",
      "plugin": "0x0000000000000000000000000000000000000000",
      "canceled": false
    },
    {
      "type": "Project",
      "addr": "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
      "name": "Project1User4",
      "url": "URLProject1User4",
      "commitTime": "86400",
      "plugin": "0x0000000000000000000000000000000000000000",
      "canceled": false
    },
    {
      "type": "Delegate",
      "addr": "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      "name": "Delegate1User1",
      "url": "URLDelegate1User",
      "commitTime": "0",
      "plugin": "0x0000000000000000000000000000000000000000",
      "canceled": false
    }
  ]
}

export default LiquidPledgingController
