// This file returns a function which generates instance of ICO using it's address.

import web3 from './web3';
import GovEthICOToken from './build/GovEthICOToken.json';


	const instance =  new web3.eth.Contract(
		JSON.parse(GovEthICOToken.interface),
		"0x94442e430a63856FB2202b3866eeDff4B1FFb094"
	);
export default instance;