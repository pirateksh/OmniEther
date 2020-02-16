import web3 from './web3';
import FundFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
	JSON.parse(FundFactory.interface),
	"0xDb736373dd9D8a0d1647F2Dc09fb4b8553DC94F1"
); 

export default instance;

// old contract 0x305E69Fe708da218aD45Eacaa4c36CFdC79B8a14