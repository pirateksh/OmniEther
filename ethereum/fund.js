// This file returns a function which generates instance of Fund using it's address.

import web3 from './web3';
import Fund from './build/Fund.json';

export default (contractAddress) => {
	return new web3.eth.Contract(
		JSON.parse(Fund.interface),
		contractAddress
	);
};