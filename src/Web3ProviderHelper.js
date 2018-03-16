import Web3 from 'web3'
import EventEmitter from 'events'

const Providers={
    INJECTED:"*",
    UNKNOWN:"unknown",
    METAMASK:"MetaMask",
    PARITY:"Parity",
    MIST:"Mist",
    INFURA:"Infura",
    LOCALHOST:"localhost"
}

const ProviderTypes={
    INJECTED:"injected",
    HTTP:"http"
}

const InjectedProviders=[
    Providers.INJECTED,
    Providers.METAMASK,
    Providers.PARITY,
    Providers.MIST
]

const ReadOnlyProviders=[
    Providers.INFURA
]

class Web3ProviderHelper extends EventEmitter
{
    constructor()
    {
        super()

        this.ACCOUNT_CHANGED = 'accountCanged'
        this.NETWORK_CHANGED = 'networkChanged'

        this.accounts = []
        this.currentAccountIndex = 0
        this.currentAccount = undefined
        this.currentNetworkId = undefined
        this.injectedProvider = undefined
        this.provider = {}
        this.providerInfo = {}
        this.accountListeners = []
        this.networkListeners = []
        this.checkInterval = undefined
        this.web3 = {}
    }

    //Should be called after window load event
    setup=(providersList=[], updateInterval=1000)=>
    {
        return new Promise((resolve, reject)=>{

            // Let's store the injected provider if exist, we may use it or not
            if (typeof web3 !== 'undefined') 
                this.injectedProvider = window.web3.currentProvider

            if(providersList.length===0)
                providersList.push(Providers.INJECTED)

            for(var i = 0; i<providersList.length;i++)
            {
                if(this.tryProvider(providersList[i]))
                    break
            }

            this.providerInfo = this.getCurrentProviderInfo()

            this.checkNetwork()

            resolve()

            //No need to check for account changes, and network?
            if(!this.providerInfo.couldWrite)
                return    
            
            this.checkAccount()

            if(this.checkInterval)
                clearInterval(this.checkInterval)

            this.checkInterval = setInterval(()=>
            {
                this.checkNetwork()
                this.checkAccount()
            }, updateInterval)
            
        })
    }

    //see if the user changes the account, or unlocks it
    checkAccount=()=>
    {
        this.web3.eth.getAccounts((error, accounts)=>
        {
            if(error)
                console.error(error)

            if (!accounts)
            {
                console.error("No accounts available")
                return
            }
        
            this.checkAccountChange(accounts)
        })
    }

    checkAccountChange=(accounts)=>
    {
        let newAddress = accounts[this.currentAccountIndex]

        //TODO check if any account is different
        this.accounts = accounts

        if(newAddress)
            this.providerInfo.canWrite = true
        else
             this.providerInfo.canWrite = false

        if(this.currentAccount !== newAddress)
        {
            this.currentAccount = newAddress
            this.emit(this.ACCOUNT_CHANGED, newAddress)
        }
    }

    getCurrentAccount=()=>
    {
        return this.currentAccount
    }

    getAccounts=()=>
    {
        return this.accounts
    }

    getCurrentAccountIndex=()=>
    {
        return this.currentAccountIndex
    }

    setAccount=(index)=>
    {
        if(index > this.accounts.length)
            return

        this.currentAccountIndex = index
        this.checkAccountChange(this.accounts)
    }

    //checks if we still on the same Ethereum network: Mainnet/Ropsten...
    checkNetwork=()=>
    {
        //TODO: reimplmement with the new web3
        /*this.web3.version.getNetwork((error, networkId) =>
        {
            if(error)
                console.error(error)

            this.checkNetworkChange(networkId)
        })*/

    }

    checkNetworkChange=(newNetworkId)=>
    {
        if(this.currentNetworkId !== newNetworkId)
        {
            this.currentNetworkId = newNetworkId
            this.emit(this.NETWORK_CHANGED)
        }
    }

    tryProvider=(providerRef)=>
    {
        if(this.isProviderType(InjectedProviders, providerRef))
        {
            if(this.injectedProvider)
                this.provider = this.injectedProvider
            else
                return false
        }
        else if (this.isHttp(providerRef))
        {
            this.provider = new Web3.providers.HttpProvider(providerRef)
        }
        else if (this.isWebSockets(providerRef))
        {
            this.provider = providerRef
        }
        else
        {
            console.warn("Unkown provider, trying to use it anyway", providerRef)
            this.provider = providerRef
        }

        this.web3 = new Web3(this.provider)
        window.web3 = this.web3

        this.web3.eth.net.isListening().then((id)=>{
            //console.log(id)
        })

        //https://github.com/ethereum/web3.js/issues/440
        //return this.web3.isConnected()
        //TODO check network with new web3
        return true
    }

    isReady=()=>
    {
        return this.setupFinished
    } 

    isHttp=(url)=>
    {  //TODO: Do a proper check
        return url.toLowerCase().indexOf("http")!==-1
    }

    isWebSockets=(url)=>
    {  //TODO: Do a proper check
        return url.toLowerCase().indexOf("ws")!==-1
    }

    isProviderType=(providersList, providerId)=>
    {
       return providersList.indexOf(providerId)!== -1
    }

    getProvider=()=>
    {
        return this.provider
    }

    addAccountChangedListener=(callback)=>
    {
        this.accountListeners.push(callback)
    }

    addNetworkChangedListener=(callback)=>
    {
        this.accountListeners.push(callback)
    }
    
    getNetworkDetails=(networkId)=>
    {
        var network = {}
        network.id = networkId
        
        switch (networkId) {
            case '1':
                network.name= 'Main-net'
                break
            case '2':
                network.name= 'Morden'
                break
            case '3':
                network.name= 'Ropsten'
                break
            case '4':
                network.name=  'Rinkeby'
                break
            case '42':
                network.name='Kovan'
                break
            default:
                network.name= 'Unknown'
        }
        
        return network
    }

    getCurrentNetwork=()=>
    {
        return this.getNetworkDetails(this.currentNetworkId)
    }

    getCurrentProviderInfo=()=>
    {
        var providerInfo={
            id:undefined,
            type:undefined,
            host:undefined,
            couldWrite:true, //refering to the blockchain. By default we assume that a provider could write
            canWrite:undefined //refering to the blockchain. Meaning that an account it's unlocked
        }

        //provider.contsructor.name is not reliable to detect the current Provider.
        //In certain circumstances that I can't figure out is "i" when it should be "HttpProvider"
        if(this.provider.constructor.name === "MetamaskInpageProvider")        
        {
            providerInfo.id= Providers.METAMASK
            providerInfo.type= ProviderTypes.INJECTED
        }

        else if(this.provider.constructor.name === "EthereumProvider")        
        {
            providerInfo.id= Providers.MIST
            providerInfo.type= ProviderTypes.INJECTED
        }

         else if(this.provider.constructor.name === "o")        
        {
            providerInfo.id= Providers.PARITY
            providerInfo.type= ProviderTypes.INJECTED
        }

        else if (this.provider.host)
        {
            if(this.provider.host.indexOf("infura")!==-1) 
            {
                providerInfo.id= Providers.INFURA
                providerInfo.type= ProviderTypes.HTTP
                providerInfo.canWrite = false          
            } 
                
            else if(this.provider.host.indexOf("localhost")!==-1)  
            { 
                providerInfo.id= Providers.LOCALHOST
                providerInfo.type= ProviderTypes.HTTP
                providerInfo.canWrite = false
            }
        }

        else
        {
            providerInfo.id= Providers.UNKNOWN
        }

        providerInfo.couldWrite = !this.isProviderType(ReadOnlyProviders, providerInfo.id)
        providerInfo.host= this.provider.host

        return providerInfo
    }

    getProviderInfo=()=>
    {
        return this.providerInfo
    }

    isConnected=()=>
    {
        return this.web3.isConnected()
    }
}

export default Web3ProviderHelper