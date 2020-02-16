// This file returns a function which generates instance of ICO using it's address.

import web3 from './web3';
import GovEthToken from './build/GovEthToken.json';


	const instance = new web3.eth.Contract(
		JSON.parse(GovEthToken.interface),
		"0xE942912000d1A1f30417ca263d58c9F87fd1F596"
	);
export default instance;