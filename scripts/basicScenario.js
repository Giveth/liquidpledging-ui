const liquidpledging = require('liquidpledging');
const Web3 = require('web3');

const { utils } = Web3;

const LiquidPledging = liquidpledging.LiquidPledging;
const Vault = liquidpledging.Vault;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;

web3 = new Web3("ws://localhost:8546");

let giver1;
let delegate1;
let adminProject1;

async function run() {
    accounts = await web3.eth.getAccounts();

    giver1 = accounts[0];
    delegate1 = accounts[1];
    adminProject1 = accounts[2];

    vault = await Vault.new(web3);
    liquidPledging = await LiquidPledging.new(web3, vault.$address, { gas: 5800000 });
    await vault.setLiquidPledging(liquidPledging.$address);
    liquidPledgingState = new LiquidPledgingState(liquidPledging);

// Create a donor

    await liquidPledging.addGiver('Giver1', 'URLGiver1', 600, 0, { from: giver1 });


// Donate

    await liquidPledging.donate(1, 1, { from: giver1, value: utils.toWei(1) });


// Create a delegate

    await liquidPledging.addDelegate('Delegate1', 'URLDelegate1', 0, 0, { from: delegate1 });

// Delegate

    await liquidPledging.transfer(1, 1, utils.toWei(0.5), 2, { from: giver1 });

// Create a project

    await liquidPledging.addProject('Project1', 'URLProject1', adminProject1, 0, 86400, 0, { from: adminProject1 });


// Propose a project

    await liquidPledging.transfer(2, 2, utils.toWei(0.2), 3, { from: delegate1 });

    const st = await liquidPledgingState.getState();
    console.log(JSON.stringify(st, null, 2));
    console.log(liquidPledging.$address);

}

console.log("")

run().then(() =>  {
    console.log("Finalized!");
    process.exit(0);
})
