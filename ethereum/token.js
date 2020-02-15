// This file returns a function which generates instance of ICO using it's address.

import web3 from './web3';
import GovEthToken from './build/GovEthToken.json';


	const instance = new web3.eth.Contract(
		JSON.parse(GovEthToken.interface),
		"0x853E075A1A477caE69eC001Aa8E72C79d408509A"
	);
export default instance;