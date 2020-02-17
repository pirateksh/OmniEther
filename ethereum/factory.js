import web3 from './web3';
import FundFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
	JSON.parse(FundFactory.interface),
	"0x4a9b67b73eD7ff4c0B2a24F694DCa0f93f8662b0"
); 

export default instance;

// old contract 0x305E69Fe708da218aD45Eacaa4c36CFdC79B8a14