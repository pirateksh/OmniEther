const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Factory.json');
const compiledToken = require('./build/GovEthToken.json');
const compiledTokenICO = require('./build/GovEthICOToken.json');
// Constructor arguments are - 
// 1. Account that will pay for contract deployment.
// 2. Link to the node that we want to connect to in the Rinkeby Network.
const provider = new HDWalletProvider(
	'noodle face want dilemma honey veteran acquire business switch flash mind toilet',
	'https://testnet2.matic.network'
);

const web3 = new Web3(provider);
// Now this instance of Web3 is completely enabled for Rinkeby Network.

// We can't use await outside a function, so we will make a function just for that.

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy TOKEN from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(compiledToken.interface))
		.deploy({ data: compiledToken.bytecode, arguments: [1000000] })
		.send({ gas: '8000000', from: accounts[0] });

	console.log('TOKEN deployed to', result.options.address);

	console.log('Attempting to deploy Factory from account', accounts[0]);

	const result2 = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode,  arguments: [result.options.address], })
		.send({ gas: '8000000', from: accounts[0] });
        // Gas amount decided after hit and trial in Remix

    console.log('FACTORY deployed to', result2.options.address);

    console.log('Attempting to deploy ICO from account', accounts[0]);

	const result3 = await new web3.eth.Contract(JSON.parse(compiledTokenICO.interface))
		.deploy({ data: compiledTokenICO.bytecode,  arguments: [result.options.address], })
		.send({ gas: '8000000', from: accounts[0] });
        // Gas amount decided after hit and trial in Remix

    console.log('ICO deployed to', result3.options.address);
	
};	


deploy();

// Matic 0x2152CD8b7CFEF975fb498cB2eF6aaf97185c45f6
// 