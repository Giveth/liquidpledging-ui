const Web3 = require('web3');

web3 = new Web3("ws://localhost:8546");

var f = web3.eth.subscribe('newBlockHeaders', function(err,b) {
    if (err) {
        console.log("ERROR", err);
    } else {
        console.log("block: " + b.number );
    }
});
