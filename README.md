# Liquid Pledging User Interface

This is a generig user interface implementation for the [liquid pledging](https://github.com/Giveth/liquidpledging) smart contract.

You an try a live version [here](https://giveth.github.io/liquidpledging-ui/).

## URL config

You can define some parameters on the url like so if you have Metamask logged in and on the Ropston Network this link will show you a version ready to play with:
https://giveth.github.io/liquidpledging-ui/#contract=0x18658A1A7cB8b0Be97b155D051769b3651b2943c&pageId=pledges&provider=*

`pageId` : Page you want to see. It can be `myFunds`, `othersFunds`, `myProjects` or `pledges`.  
`provider`: Provider you want to connect. Default is `injected`, but you can use another one like `ws://localhost:8546`
`contract`: Liquid pledging contract address you want to explore. Default one is the from Ropsten.

LP contracts you can try:
`0x5b1869D9A4C187F2EAa108f3062412ecf0526b24`: Deterministicaly created, you want to use this if you're testing running `npm run go`.  
`0x18658A1A7cB8b0Be97b155D051769b3651b2943c`: Default on Ropsten network.  
`0x5625220088cA4Df67F15f96595546D10e9970B3A`: On Rikeby network. Not working. LP module is not returning data.



# Install
## Basic

Clone this repository into your computer

`git clone https://github.com/Giveth/liquidpledging-ui.git`

Install npm dependencies

`npm install`


## Creating mock data

We're using an slightly modified version of testrpc in order to use it with websockets.

To start your local testrpc node run

`npm run testrpc`

Now let's generate some mock data by runing a little script.
This will deploy the liquidpledging contract into the already running testrpc network and then it will create some mock users and pledges.

`node scripts/basicScenario.js`

## Compile the interface

With some mock data in place, we can try it out.

`npm start`

This will compile the interface and serve it locally at  `http://localhost:3000/`

## Fast setup

Run `npm run go` to do all the above at once.
It will start testrpc, create mock-data, compile, and start a local server for the frontend.
In addition it will also kill any process running on ports 3000, 8545 and 8546.

## Build

If you want to build and optimized version run

`npm run build`


