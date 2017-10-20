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
    user3 = accounts[2];
    user4 = accounts[3];
    user5 = accounts[4];

    vault = await Vault.new(web3);
    liquidPledging = await LiquidPledging.new(web3, vault.$address, { gas: 5800000 });
    await vault.setLiquidPledging(liquidPledging.$address);
    liquidPledgingState = new LiquidPledgingState(liquidPledging);

/*

//Redelegation

await liquidPledging.addGiver('Giver1User1', 'URLGiver1User1', 600, 0, { from: user1 }); //crea admin #1
await liquidPledging.addDelegate('Delegate1User2', 'URLDelegate1User2', 0, 0, { from: user2 }); //crea admin #2
await liquidPledging.addDelegate('Delegate1User3', 'URLDelegate1User3', 0, 0, { from: user3 }); //crea admin #3
await liquidPledging.addDelegate('Delegate1User4', 'URLDelegate1User4', 0, 0, { from: user4 }); //crea admin #4
await liquidPledging.donate(1, 1, { from: user1, value: utils.toWei(1) }); //Crea pledge #1

await liquidPledging.transfer(1, 1, utils.toWei(0.5), 2, { from: user1 });  //Delega de #1 a #2, crea pledge #2
await liquidPledging.transfer(2, 2, utils.toWei(0.5), 3, { from: user2 });  //Delega de #2 a #3, crea pledge #3


await liquidPledging.transfer(1, 3, utils.toWei(0.5), 1, { from: user1, gas: 2000000 }); 

*/

//Let's create all the admins fiirst. 5 givers, 5delegates and 5 proejcts. 15 in total
    await liquidPledging.addGiver('Giver1User1', 'URLGiver1User1', 600, 0, { from: user1 }); //#A1 --> Means: Admin[1] is created
    await liquidPledging.addGiver('Giver1User2', 'URLGiver1User2', 600, 0, { from: user2 }); //#A2
    await liquidPledging.addGiver('Giver1User3', 'URLGiver1User3', 600, 0, { from: user3 }); //#A3
    await liquidPledging.addGiver('Giver1User4', 'URLGiver1User4', 600, 0, { from: user4 }); //#A4
    await liquidPledging.addGiver('Giver1User5', 'URLGiver1User5', 600, 0, { from: user5 }); //#A5

    await liquidPledging.addDelegate('Delegate1User1', 'URLDelegate1User1', 0, 0, { from: user1 }); //#A6
    await liquidPledging.addDelegate('Delegate1User2', 'URLDelegate1User2', 0, 0, { from: user2 }); //#A7
    await liquidPledging.addDelegate('Delegate1User3', 'URLDelegate1User3', 0, 0, { from: user3 }); //#A8
    await liquidPledging.addDelegate('Delegate1User4', 'URLDelegate1User4', 0, 0, { from: user4 }); //#A9
    await liquidPledging.addDelegate('Delegate1User5', 'URLDelegate1User5', 0, 0, { from: user5 }); //#A10

    await liquidPledging.addProject('Project1User1', 'URLProject1User1', user4, 0, 86400, 0, { from: user1 }); //#A11
    await liquidPledging.addProject('Project1User2', 'URLProject1User2', user4, 0, 86400, 0, { from: user2 }); //#A12
    await liquidPledging.addProject('Project1User3', 'URLProject1User3', user4, 0, 86400, 0, { from: user3 }); //#A13
    await liquidPledging.addProject('Project1User4', 'URLProject1User4', user4, 0, 86400, 0, { from: user4 }); //#A14
    await liquidPledging.addProject('Project1User5', 'URLProject1User5', user4, 0, 86400, 0, { from: user5 }); //#A15

//-------------------    

    await liquidPledging.donate(1, 1, { from: user1, value: utils.toWei(1) }); //#P1 --> Means: Pledge[1] is created
    await liquidPledging.donate(2, 2, { from: user2, value: utils.toWei(2) }); //#P2
    await liquidPledging.donate(3, 3, { from: user3, value: utils.toWei(3) }); //#P3
    await liquidPledging.donate(4, 4, { from: user4, value: utils.toWei(4) }); //#P4
    await liquidPledging.donate(5, 5, { from: user5, value: utils.toWei(5) }); //#P5

//Now let's create a long chain of pledges from giver1 to project15 passing through all delegates

    //From GiverUser1(#1), pledge #1(first donate) to DelegateUser2(#2)
    await liquidPledging.transfer(1, 1, utils.toWei(0.5), 7, { from: user1 }); //#P6

    //From DelegateUser2(#7, pledge #6 (previous pledge) to DelegateUser3(#8)
    await liquidPledging.transfer(7, 6, utils.toWei(0.5), 8, { from: user2 }); //#P7

    //From DelegateUser3(#8, pledge #7 (previous pledge) to DelegateUser4(#9)
    await liquidPledging.transfer(8, 7, utils.toWei(0.5), 9, { from: user3 }); //#P8

    //From DelegateUser4(#9, pledge #8 (previous pledge) to ProjectUser5(#15)
    await liquidPledging.transfer(9, 8, utils.toWei(0.3), 15, { from: user4 }); //#P9


    //Let's undo the last transfer by assigning the funds back to the issuer
    await liquidPledging.transfer(8, 9, utils.toWei(0.3), 8, { from: user3, gas: 2000000 }); //Does not create pledge! (moving funds to self)

    //And move funds to somewhere else
    await liquidPledging.transfer(8, 8, utils.toWei(0.1 ), 14, { from: user3}); //#P10

    //Multiple donations 
    await liquidPledging.addGiver('Giver2User1', 'URLGiver2User1', 600, 0, { from: user1 }); //#A16
    await liquidPledging.donate(1, 16, { from: user1, value: utils.toWei(0.1) }); //#P11
    await liquidPledging.donate(1, 16, { from: user1, value: utils.toWei(0.1) }); //Doesn't create pledge! (Relationship 1-16 already exist)
    await liquidPledging.donate(1, 16, { from: user1, value: utils.toWei(0.1) }); //Doesn't create pledge
    await liquidPledging.donate(1, 16, { from: user1, value: utils.toWei(0.1) }); //Doesn't create pledge
    await liquidPledging.donate(1, 16, { from: user1, value: utils.toWei(0.1) }); //Doesn't create pledge

    //Delegaing from different donors to the same one

    await liquidPledging.addDelegate('Delegate2User1', 'URLDelegate2User1', 0, 0, { from: user1 }); //#A17
    await liquidPledging.transfer(16, 11, utils.toWei(0.2), 17, { from: user1 }); //#12
    await liquidPledging.transfer(2, 2, utils.toWei(0.5), 17, { from: user2 }); //#P13

    const st = await liquidPledgingState.getState();
    console.log(JSON.stringify(st, null, 2));
    console.log(liquidPledging.$address);

}

run().then(() =>  {
    console.log("Finalized!");
    process.exit(0);
})
