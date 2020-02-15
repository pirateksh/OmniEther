import web3 from './web3';
import FundFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
	JSON.parse(FundFactory.interface),
	"0xaB2789Afbdfd4D79aa657AC0249d95A743Ab0D68"
); 

export default instance;