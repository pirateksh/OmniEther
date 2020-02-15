import web3 from './web3';
import FundFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
	JSON.parse(FundFactory.interface),
	"0x2152CD8b7CFEF975fb498cB2eF6aaf97185c45f6"
); 

export default instance;

// old contract 0x305E69Fe708da218aD45Eacaa4c36CFdC79B8a14