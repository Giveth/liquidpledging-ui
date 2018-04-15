const liquidpledging = require('liquidpledging');
const Web3 = require('web3');

const { utils } = Web3;

const LiquidPledging = liquidpledging.LiquidPledging;
const Vault = liquidpledging.Vault;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;

web3 = new Web3("ws://localhost:8546");

let user0;
let user1;
let user2;
let user3;
let user4

async function run() {
    accounts = await web3.eth.getAccounts();

    user0 = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    user3 = accounts[3];
    user4 = accounts[4];

    vault = await Vault.new(web3);
    liquidPledging = await LiquidPledging.new(web3, vault.$address, { gas: 5800000 });
    await vault.setLiquidPledging(liquidPledging.$address);
    liquidPledgingState = new LiquidPledgingState(liquidPledging);

//Let's create all the admins fiirst. 5 givers, 5delegates and 5 proejcts. 15 in total
    await liquidPledging.addGiver('Giver0', 'URLGiver0', 60, 0, { from: user0 }); //#A1 --> Means: Admin[1] is created
    await liquidPledging.addGiver('Giver1', 'URLGiver1', 60, 0, { from: user1 }); //#A2
    await liquidPledging.addGiver('Giver2', 'URLGiver2', 60, 0, { from: user2 }); //#A3
    await liquidPledging.addGiver('Giver3', 'URLGiver3', 60, 0, { from: user3 }); //#A4
    await liquidPledging.addGiver('Giver4', 'URLGiver4', 60, 0, { from: user4 }); //#A5

    await liquidPledging.addDelegate('Delegate0', 'URLDelegate0', 60, 0, { from: user0 }); //#A6
    await liquidPledging.addDelegate('Delegate1', 'URLDelegate1', 60, 0, { from: user1 }); //#A7
    await liquidPledging.addDelegate('Delegate2', 'URLDelegate2', 60, 0, { from: user2 }); //#A8
    await liquidPledging.addDelegate('Delegate3', 'URLDelegate3', 60, 0, { from: user3 }); //#A9
    await liquidPledging.addDelegate('Delegate4', 'URLDelegate4', 60, 0, { from: user4 }); //#A10

    await liquidPledging.addProject('Project0', 'URLProject0', user0, 0, 60, 0, { from: user0 }); //#A11
    await liquidPledging.addProject('Project1', 'URLProject1', user1, 0, 60, 0, { from: user1 }); //#A12
    await liquidPledging.addProject('Project2', 'URLProject2', user2, 0, 60, 0, { from: user2 }); //#A13
    await liquidPledging.addProject('Project3', 'URLProject3', user3, 0, 60, 0, { from: user3 }); //#A14
    await liquidPledging.addProject('Project4', 'URLProject4', user4, 0, 60, 0, { from: user4 }); //#A15

//-------------------    

    await liquidPledging.donate(1, 1, { from: user0, value: utils.toWei('5') }); //#P1 --> Means: Pledge[1] is created
    await liquidPledging.donate(2, 2, { from: user1, value: utils.toWei('5') }); //#P2
    await liquidPledging.donate(3, 3, { from: user2, value: utils.toWei('5') }); //#P3
    await liquidPledging.donate(4, 4, { from: user3, value: utils.toWei('5') }); //#P4
    await liquidPledging.donate(5, 5, { from: user4, value: utils.toWei('5') }); //#P5

//Now let's create a long chain of pledges from giver to projecssing through all delegates

    //From Giveruser0(#1), pledge #1(first donate) to Delegateuser1(#2)
    await liquidPledging.transfer(1, 1, utils.toWei('2'), 7, { from: user0 }); //#P6

    //From Delegateuser1(#7, pledge #6 (previous pledge) to Delegateuser2(#8)
    await liquidPledging.transfer(7, 6, utils.toWei('1.5'), 8, { from: user1 }); //#P7

    //A delegate (Delegateuser0) controling multiple delegations
    await liquidPledging.transfer(1, 1, utils.toWei('0.8'), 6, { from: user0 }); //#P8
    await liquidPledging.transfer(2, 2, utils.toWei('0.6'), 6, { from: user1 }); //#P9
    //await liquidPledging.transfer(7, 7, utils.toWei('0.4'), 6, { from: user1 }); //#P10
    await liquidPledging.transfer(3, 3, utils.toWei('0.2'), 6, { from: user2 }); //#P11

    //await liquidPledging.transfer(1, 1, utils.toWei('0.5'), 8, { from: user0 }); //#P12

    
    const st = await liquidPledgingState.getState();
    console.log(JSON.stringify(st, null, 2));
    console.log(liquidPledging.$address);

}

run().then(() =>  {
    console.log("Finalized!");
    process.exit(0);
}).catch((error)=>
{
    console.log(error)
    process.exit(1)
})
