# Liquid Pledging User Interface

This is a test interface for the [liquid pledging](https://github.com/Giveth/liquidpledging) smart contract.

## Basic Install

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

If you want to build and optimized version run

`npm run build`


