# OmniEther (Hack36 2020 Project)
An Ethereum and IPFS based project to ensure transparency and security in Asset transfer.

## Central Theme: - Security and Surveillance
* __Problem to be solved:-__ Maintaining transparency and security while transferring assets (money or important data) from top level to bottom level in a hierarchical organization/system thus ensuring that all intended assets reach bottom-most level without leakage.
* __A Real Life Problem:-__  In 1985 Rajiv Gandhi said that for every 1 rupee allotted to any project,  only 15 paisa reaches to the ground level. Our Project will solve this issue seamlessly. 

## How we are able to solve this:-
 * We are creating smart contract in Solidity which will handle public money or valuable assets.
 * The smart contract is deployed on __Matic testnet2 network__ to leverage their __developer friendly__ sidechains and __fast transactions__ as compared to Rinkeby Test Network etcetera.
 * For mimicking real world architect we are deploying contracts in __Hierarchical format__ just like Tree (data structure).
 * For Hierarchical format we are deploying __self-replicated contract instances__ i.e. each _contract instance deploys an instance of same contract_ and transfers some fraction of it’s money to child instance and thus we achieve transfer of funds in hierarchy.
 * Any organization can create their root node (an instance of smart contract) and then  those instance can go on replicating themselves as long as there is need to transfer assets to lower level.
 * Only through leaf nodes valuable assets can be transferred into private accounts. There one can, either through public opinion or through their own survey, decide completion of project by the owner of that private account and after that finalize request to transfer valuable assets to that account. Thus, money leaves our __tree__ of smart contracts only after solid verification.
 * Between any parent-child instance of smart contract only manager of either instance is able to request asset transfer between them.
 * Every time before deploying an instance of smart contract we are asking whether this node is leaf node or lowest level instance of smart contract. So that only this kind of instance is capable to transfer assets to private account to check fraudulence.
 * Each instance of smart contract has a dedicated __chat channel__ setup by manager of that instance which can accessed by persons authorized by the manager.
 * Chats are encrypted using __AES 256 encryption__, thus and cannot be accessed by unauthorized individual.
 * OrbitDB and IPFS technology is used to store and serve chats.
 * APIs were created using __express.js__ to fetch chats from OrbitDB.
 * We have used custom __ERC20 token__ (named __GovEth__) and initiated an __ICO (Inital Coin Offering)__ to counter high fluctuation in Ether's monetary value.
 
## Link to Youtube Video of Demo of our Hack
https://www.youtube.com/watch?v=P-O4lJjbQ8Y
 
## Basic Flowchart describing our Hack.
![alt text](https://github.com/pirateksh/To-Be-Decided/blob/master/Flow_Chart.jpeg)

## How to use ?
 * Clone the repository using `git clone https://github.com/pirateksh/OmniEther.git`.
 * Run `npm install`
 * Run `npm run dev` and then visit `localhost:3000`.
 * Add our _GovEth_ custom token in MetaMask using this address `0xE942912000d1A1f30417ca263d58c9F87fd1F596`. For more information on how to add Custom Tokens in MetaMask visit `https://tokenmint.io/blog/how-to-add-your-custom-erc-token-to-metamask.html`.
 * To configure _Matic testnet_ in _MetaMask_, visit `https://docs.matic.network/newbies/conf-testnet-metamask/`.
 * You are ready to go now...

## Technology Stack:-
    * Ethereum, 
    * Solidity(to write Smart Contract), 
    * Matic(for deploying Smart Contract), 
    * ERC20 token,
    * Node.js (for backend), 
    * React.js(for frontend), 
    * Web3.js(for blockchain interaction), 
    * Next.js(for server side rendering of frontend pages), 
    * Express.js(to create API to fetch chats from OrbitDB)
    * OrbitDB (decentralized database based on IPFS)

## Contributors - Team EnigmaHaxx
* <a href="https://github.com/ankitsangwan1999">Ankit Sangwan</a>
* <a href="https://github.com/arc29">Aritra Chatterjee</a>
* <a href="https://github.com/thisismanishkumar">Manish Kumar</a>
* <a href="https://github.com/pirateksh">Kshitiz Srivastava</a>

