# Liquid Pledging User Interface

This is a test interface for the [liquid pledging](https://github.com/Giveth/liquidpledging) smart contract.

## Basic Install

Clone this repository into your computer
`git clone https://github.com/Giveth/liquidpledging-ui.git`

Install npm dependencies
`npm install`


## Creating mock data

At the current stage the functionalities are limited, so we need to pre-generate some pledges on our local node to be able to visualize something.

For this you will need to have [testrpc](https://github.com/ethereumjs/testrpc) installed.

Run it using 
`testrpc --deterministic --gasLimit 6000000`

The `--deterministic` is important because the current contract is hard-coded. This will ensure that testrpc deploys it to the same address.

Because the contract is quite big, we need to increase the block gas limit size. That's why the `--gasLimit 6000000` option.

Now let's generate some mock data by runing a little script.
This will deploy the liquidpledging contract into our local testrpc network. Then it creates some mock users and pledges.
`node scripts/basicScenario.js`

With that in place we can try out the user interface again:
`npm start`


## Compile the interface

With some mock data in place, we can try it out.

`npm start`

This will compile the interface and serve it locally at  `http://localhost:3000/`

If you want to build and optimized version run
`npm run build`


