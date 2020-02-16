// This file returns a function which generates instance of ICO using it's address.

import web3 from './web3';
import GovEthICOToken from './build/GovEthICOToken.json';


	const instance =  new web3.eth.Contract(
		JSON.parse(GovEthICOToken.interface),
		"0x6De3Bd96d0C790BcD3827FAde4C50d131b040C72"
	);
export default instance;