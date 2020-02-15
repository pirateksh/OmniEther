const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Factory.json');

// Constructor arguments are - 
// 1. Account that will pay for contract deployment.
// 2. Link to the node that we want to connect to in the Rinkeby Network.
const provider = new HDWalletProvider(
	'noodle face want dilemma honey veteran acquire business switch flash mind toilet',
	'https://rinkeby.infura.io/v3/fecaf04a298945df852fef4c456adca3'
);

const web3 = new Web3(provider);
// Now this instance of Web3 is completely enabled for Rinkeby Network.

// We can't use await outside a function, so we will make a function just for that.

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ gas: '4564108', from: accounts[0] });
        // Gas amount decided after hit and trial in Remix
	console.log('Contract deployed to', result.options.address);
};	


deploy();