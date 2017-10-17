const liquidpledging = require('liquidpledging');
const Web3 = require('web3');

const { utils } = Web3;

const LiquidPledging = liquidpledging.LiquidPledging;
const Vault = liquidpledging.Vault;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;

web3 = new Web3("ws://localhost:8546");

let user1;
let user2;
let user3;
let user4;

async function run() {
    accounts = await web3.eth.getAccounts();

    user1 = accounts[0];
    user2 = accounts[1];
    user4 = accounts[2];
    user3 = accounts[3];

    vault = await Vault.new(web3);
    liquidPledging = await LiquidPledging.new(web3, vault.$address, { gas: 5800000 });
    await vault.setLiquidPledging(liquidPledging.$address);
    liquidPledgingState = new LiquidPledgingState(liquidPledging);

// Create a donor

    await liquidPledging.addGiver('Giver1User1', 'Giver1User1', 600, 0, { from: user1 });

// Donate
// Admin #1 donates 2 ether to himself
// A pledge is created as a result (#1)

    await liquidPledging.donate(1, 1, { from: user1, value: utils.toWei(2) });

// Create a delegate
    await liquidPledging.addDelegate('Delegate1User2', 'URLDelegate1User2', 0, 0, { from: user2 });

// Create a delegate
    await liquidPledging.addDelegate('Delegate1User3', 'URLDelegate1User3', 0, 0, { from: user3 });

// Delegate
// Admin#1 delegates 0.5 ether to admin#2
// Pledge #2 is created as a result
    await liquidPledging.transfer(1, 1, utils.toWei(0.5), 2, { from: user1 });

// Delegate
// Admin #2 delegates 0.5 ether to admin #3
// Pledge #2 is created as a result
    await liquidPledging.transfer(2, 2, utils.toWei(0.2), 3, { from: user2 });

// Create a project
    await liquidPledging.addProject('Project1User4', 'URLProject1User4', user4, 0, 86400, 0, { from: user4 });

// Propose a project
// Admin #2 delegates to pledge#2 0.2 eth
    await liquidPledging.transfer(2, 3, utils.toWei(0.2), 4, { from: user2 });

// Create a delegate
    await liquidPledging.addDelegate('Delegate1User1', 'URLDelegate1User', 0, 0, { from: user1 });


    const st = await liquidPledgingState.getState();
    console.log(JSON.stringify(st, null, 2));
    console.log(liquidPledging.$address);

}

console.log("")

run().then(() =>  {
    console.log("Finalized!");
    process.exit(0);
})
