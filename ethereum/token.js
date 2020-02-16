// This file returns a function which generates instance of ICO using it's address.

import web3 from './web3';
import GovEthToken from './build/GovEthToken.json';


	const instance = new web3.eth.Contract(
		JSON.parse(GovEthToken.interface),
		"0xb0f40A3e859dF7880E994AfE7722c899C50586cf"
	);
export default instance;