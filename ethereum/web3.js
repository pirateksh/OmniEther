// import Web3 from 'web3';

// let web3;

// if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
// 	// We are in the browser and metamask is running.
// 	web3 = new Web3(window.web3.currentProvider);
// 	console.log("HRERRE00");
// } else {
// 	// We are on the server *OR* the user is not running metamask
// 	const provider = new Web3.providers.HttpProvider(
// 		'https://rinkeby.infura.io/v3/fecaf04a298945df852fef4c456adca3'
// 	);

// 	console.log("HRERRE00");

// 	web3 = new Web3(provider);
// }

// export default web3;



import Web3 from 'web3';

let web3;
if(typeof window!=='undefined' && typeof window.web3!=='undefined'){
    window.addEventListener('load', async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.enable();
                // Acccounts now exposed
                
            } catch (error) {
                console.log("Permission denied!")
                
            }
        }
        
    });
web3=new Web3(window.web3.currentProvider);
}
else{
    console.log('a');
    const provider=new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/fecaf04a298945df852fef4c456adca3');
    web3=new Web3(provider)
}

export default web3;