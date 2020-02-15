import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	// We are in the browser and metamask is running.
	web3 = new Web3(window.web3.currentProvider);
} else {
	// We are on the server *OR* the user is not running metamask
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/v3/fecaf04a298945df852fef4c456adca3'
	);

	web3 = new Web3(provider);
}

export default web3;



// if(typeof window !='undefined' && typeof window.web3 != 'undefined')
// {
// }
// else
// {
//     const provider = new Web3.providers.HttpProvider(
//         'https://rinkeby.infura.io/v3/fefd36760efb4b1c9e94f04fa3f8e3f0'
//         // 'https://testnetv3.matic.network'
//     );
//     web3 = new Web3(provider);
// }