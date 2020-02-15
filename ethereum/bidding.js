// This file returns a function which generates instance of Bidding using it's address.

import web3 from './web3';
import Bidding from './build/Bidding.json';

export default (contractAddress) => {
	return new web3.eth.Contract(
		JSON.parse(Bidding.interface),
		contractAddress
	);
};