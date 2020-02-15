// This file returns a function which generates instance of ICO using it's address.

import web3 from './web3';
import GovEthICOToken from './build/GovEthICOToken.json';


	const instance =  new web3.eth.Contract(
		JSON.parse(GovEthICOToken.interface),
		"0xc33ae2f25c6EF88613B1Dd982ce3Ea73835F11Cb"
	);
export default instance;