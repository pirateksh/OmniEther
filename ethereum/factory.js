import web3 from './web3';
import FundFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
	JSON.parse(FundFactory.interface),
	"0x8EbfeC2bEb35576dFD94E62b68380470651A85CE"
); 

export default instance;

// old contract 0x305E69Fe708da218aD45Eacaa4c36CFdC79B8a14