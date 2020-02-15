import web3 from './web3';
import FundFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
	JSON.parse(FundFactory.interface),
	"0x81835bfB922eB03d12517CbEEB403E6b1C68e8fb"
); 

export default instance;