pragma solidity^0.4.17;

// For Protecting the Contract From IntergerOverflow Attacks.
library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }
   
    function add(uint256 a, uint256 b) internal pure returns (uint256)   {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

contract GovEthToken {
    function () public  {} // Fallback Function Just for Safety.(Not Payable as none the function used is payable).

    using SafeMath for uint256;

    // @return total amount of tokens that was Supplied During Creation of this Token.
    // function totalSupply() public view returns (uint256);

    // // @return The balance
    // function balanceOf(address tokenOwner) public view returns (uint);

    // function transfer(address to, uint tokens) public returns (bool);
    // function transferFrom(address from, address to, uint tokens) public returns (bool);

    // function approve(address spender, uint tokens)  public returns (bool);
    // function allowance(address tokenOwner, address spender)public view returns (uint);

    // event Approval(address indexed tokenOwner, address indexed spender,uint tokens);
    event Transfer(address indexed from, address indexed to,uint tokens);

    address public manager;
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalTokenSupply;

    // This mapping contains the address of the TokenOwner as key and TokenBalance as value.
    mapping(address => uint256) balances;

    // This mapping contains address of the approver as key and mapping of the approved delegate address to TokenValue approve as value.
    // mapping(address => mapping (address => uint256)) allowed;

    function GovEthToken(uint256 totalTokens) public {
        balances[msg.sender] = totalTokens;              
        totalTokenSupply = totalTokens;                      
        name = "GovEth";                              
        decimals = 0;                              
        symbol = "GE";
        manager = msg.sender;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    // This Function transfer numTokens to the receiver from the balance of msg.sender
    // It does so by firing the Transfer Event
    function transfer(address owner ,address receiver,uint numTokens) public returns (bool) {
        require(balances[owner] != 0);
        require(numTokens <= balances[owner]);
        balances[owner] = balances[owner].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        Transfer(owner, receiver, numTokens); // firing ERC20 event -> Transfer
        return true;
    }

    function transferTokensFromManager(address receiver,uint numTokens) public returns(bool){
        require(balances[manager] != 0);
        require(numTokens <= balances[manager]);
        balances[manager] = balances[manager].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        Transfer(manager, receiver, numTokens);
        return true;
    }

    // This function will give approval of msg.sender to the delegate address to spend numTokens
    // It does so by firing the Approval Event
    // function approve(address delegate,uint numTokens) public returns (bool) {
    //     allowed[msg.sender][delegate] = numTokens;
    //     Approval(msg.sender, delegate, numTokens);
    //     return true;
    // }

    // Helper Function to return the TokenAmount approved by a TokenOwner to The Delegate Address.
    // function allowance(address owner,address delegate) public view returns (uint) {
    //     return allowed[owner][delegate];
    // }

    // function transferFrom(address owner, address buyer,uint numTokens) public returns (bool) {
    //     require(numTokens <= balances[owner]);
    //     require(numTokens <= allowed[owner][msg.sender]);
    //     balances[owner] = balances[owner].sub(numTokens);
    //     allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
    //     balances[buyer] = balances[buyer].add(numTokens);
    //     Transfer(owner, buyer, numTokens);
    //     return true;
    // }

}

contract GovEthICOToken{
    address GovEthTokenAddress;
    GovEthToken instance;
    uint tokens_per_wei = 100;

    function GovEthICOToken(address gov_eth_token_address) public{
        GovEthTokenAddress = gov_eth_token_address;
        instance = GovEthToken(GovEthTokenAddress);
    }

    function get_GovEth_tokens() public payable{
        uint Tokens = tokens_per_wei * msg.value;
        require(Tokens <= instance.balanceOf(instance.manager()));
        instance.transferTokensFromManager(msg.sender,Tokens);
    }

}

contract Factory {
   
    address[] public deployedRoots;
    mapping(address => bool) public isDeployedRoot;
    address temp;
    address public GovEthTokenAddress;
    GovEthToken TokenInstance;
   
    function Factory(address tokenAddress) public{
        GovEthTokenAddress = tokenAddress;
        TokenInstance = GovEthToken(GovEthTokenAddress);
    }


    function createRootNode(string description_, uint tokens) public {
        address newFund = new Fund(description_, temp, msg.sender, address(this), false, GovEthTokenAddress);

        TokenInstance.transfer(msg.sender, newFund, tokens);
        // newFund.transfer(msg.value);

        isDeployedRoot[newFund] = true;
        deployedRoots.push(newFund);
    }

    function createChildNode(string description_, address manager, bool is_last_level) public returns (address) {
        require(isDeployedRoot[msg.sender] == true); // Only already deployed contracts can call this function
        address newFund = new Fund(description_, msg.sender, manager, address(this), is_last_level, GovEthTokenAddress);
        deployedRoots.push(newFund);
        isDeployedRoot[newFund] = true;
        return newFund;
    }
   
    function rootTokenInjection(address rootAddress) public payable {
        // This functions injects money to an already deployed Fund Contract
        require(isDeployedRoot[rootAddress]);
        require(msg.sender == Fund(rootAddress).manager());  
        TokenInstance.transfer(msg.sender, rootAddress,TokenInstance.balanceOf(msg.sender));
    }

    function getDeployedRoots() public view returns (address[]) {
        return deployedRoots;
    }
}


contract Fund {
   
    function() public payable { } // fallback Function to handle ether transaction inbetween Contracts.
    address public GovEthTokenAddress;
    GovEthToken TokenInstance;

    struct fundRequestByChild {
        // This request can be created by potentialChildManagers
        // This will be approved by current Contract's manager as
        // well as current Contract's Parent's manager.
        address requestCreator;
        string description;
        uint value;
        bool complete;
        bool approvedByCurrentManager;
        bool approvedByParentManager;
        bool isLastLevel;
        bool isPublicInvolved;
        mapping(address => bool) publicResponded;
        uint positivePublicResponseCount;
    }
   
    struct fundRequestByManager {
        // Created by manager if this Contract
        // approved by parentManager
        address requestCreator;
        address assigned_manager;
        string description;
        uint value;
        bool complete;
        bool approvedByParentManager;
        bool isLastLevel;
    }
   
    string public briefDescription;
    bool public isLastLevel;
    bool public isTenderFinalized;
    address public parent;

    // ParentFund reference can also be stored like
    // Fund parentFund = Fund(parent)
    address public manager;
    address public parentManager;
    Factory public factory;
    address public CompanyAlloted;
    address[] public childFunds;
    address[] public potentialChildManagers;
   
    fundRequestByChild[] public fundRequestsByChild;
    fundRequestByManager[] public fundIssuingsByManager;
   
    mapping(address => bool) public isPotentialChildManager;
    // mapping(string => bool) public initializedMilestones;
   
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    modifier restrictedCompanyAllotment() {
        require(CompanyAlloted != 0);
        _;
    }
   
    function Fund(string description_, address newParent, address managerAddress, address factoryAddress, bool is_last_level, address tokenAddress) public {
        isLastLevel = is_last_level;
        isTenderFinalized = false;
        GovEthTokenAddress = tokenAddress;
        TokenInstance = GovEthToken(GovEthTokenAddress);
        briefDescription = description_;
        manager = managerAddress;
        factory = Factory(factoryAddress);

        if(newParent == 0) {
            parent = address(this);
            parentManager = manager;
        }
        else {
            parent = newParent;
            parentManager = Fund(parent).manager();
        }
    }
   
    function createfundRequestByChild(uint value, string description, bool is_last_level, bool is_public_involved) public {
        require(isPotentialChildManager[msg.sender]);    
        require(value <= TokenInstance.balanceOf(address(this)));
        fundRequestByChild memory newRequest = fundRequestByChild({
            requestCreator: msg.sender,
            description: description,
            value: value,
            complete: false,
            approvedByCurrentManager: false,
            approvedByParentManager: false,
            isLastLevel: is_last_level,
            isPublicInvolved: is_public_involved,
            // No updates for publicResponded as of now.
            positivePublicResponseCount: 0
        });
        fundRequestsByChild.push(newRequest);

    }
   
    function createfundRequestByManager(address assigned_manager ,string description,uint value, bool is_last_level) public restricted{
        require(isPotentialChildManager[assigned_manager]==true);
        require(value <= TokenInstance.balanceOf(address(this)) );
        fundRequestByManager memory newfundRequestByManager = fundRequestByManager({
            requestCreator: msg.sender,
            assigned_manager: assigned_manager,
            description: description,
            value: value,
            complete: false,
            approvedByParentManager: false,
            isLastLevel: is_last_level
        });
       
        fundIssuingsByManager.push(newfundRequestByManager);
       
    }
   
    /*
    // Cannot return array of structs
   
    function getFundAllotmentRequests() public view returns(FundAllotmentRequest[]) {
        return fundAllotmentRequests;
    }
    */
   
   
    function approvefundRequestByChild(uint index) public {
        require(msg.sender == parentManager || msg.sender == manager);
        fundRequestByChild storage request = fundRequestsByChild[index];
       
        if(msg.sender == parentManager) {
            require(!request.approvedByParentManager);
            request.approvedByParentManager = true;
        }
        if(msg.sender == manager) {
            require(!request.approvedByCurrentManager);
            request.approvedByCurrentManager = true;
        }
    }
   
    function approvefundRequestByManager(uint index) public{
        // CHECK THIS FUNCTION
        require(msg.sender == parentManager);
        fundRequestByManager storage request = fundIssuingsByManager[index];
        require(!request.approvedByParentManager);
        request.approvedByParentManager= true;
    }
   
    function finalizefundRequestByChild(uint index) public restricted {
        fundRequestByChild storage request = fundRequestsByChild[index];
       
        require(!request.complete);
        require(request.approvedByCurrentManager);
        require(request.approvedByParentManager);
        if(isLastLevel){
            request.complete = true;
            if(request.isPublicInvolved){
                require( percent(request.positivePublicResponseCount, public_volunteers_list.length, 2) >= 70 );
                InitializingMilestone(request.value, request.requestCreator);
            }
            else{
                InitializingMilestone(request.value, request.requestCreator);
                // initializedMilestones[request.description] = true;
            }
        }
        else{
            createChild(request.description,request.value, request.requestCreator, request.isLastLevel);
        }
        request.complete = true;
    }
   
    function finalizefundRequestByManager(uint index) public restricted {
        fundRequestByManager storage request = fundIssuingsByManager[index]; // storage means don't create a new copy i.e. work on original copy.
        require(!request.complete);
        require(request.approvedByParentManager);
        if(isLastLevel){
            request.complete = true;
            InitializingMilestone(request.value, request.assigned_manager);
        }
        else{
            createChild(request.description, request.value, request.assigned_manager, request.isLastLevel);
            request.complete = true;
        }
    }
   
    function InitializingMilestone( uint amount, address company) public restricted restrictedCompanyAllotment{
        require(CompanyAlloted == company);
        require(isLastLevel);
        require(amount <= TokenInstance.balanceOf(address(this)) );
        TokenInstance.transfer(address(this), CompanyAlloted, amount);
    }
   
    // function getCurrentBalance() public view returns(uint) {
    //     // This is for testing purpose. Can be removed later on
    //     // as we can get balance using web3.eth.getBalance(address)
    //     return address(this).balance;
    // }
   
    // function getPotentialChildManagers() public view returns(address[]) {
    //     return potentialChildManagers;
    // }
   
    function addPotentialChildManager(address childManager) public restricted{
        require(isPotentialChildManager[childManager]==false);
        if(isLastLevel){
            // require(childManager != 0);
            require(childManager == CompanyAlloted);
            potentialChildManagers.push(childManager);
            isPotentialChildManager[childManager] = true;
        }
        else{
            // require(childManager != 0);
            potentialChildManagers.push(childManager);
            isPotentialChildManager[childManager] = true;
        }
    }
   
    function createChild(string description_,uint amount, address childManagerAddress, bool is_last_level) private restricted {
        // Private because this is not called directly by user or other contracts
        require(amount <= TokenInstance.balanceOf(address(this)) );
        require(isPotentialChildManager[childManagerAddress]);
        address child = factory.createChildNode(description_, childManagerAddress, is_last_level);
        childFunds.push(child);
        TokenInstance.transfer(address(this), child, amount);
    }

    function withdrawFunds() public {
        // Function to withdraw funds. This can be called
        // only by parentManager
        require(msg.sender == parentManager);
        TokenInstance.transfer(address(this), parent, TokenInstance.balanceOf(address(this)));
    }
   
    function getChildFunds() public view returns(address[]) {
        return childFunds;
    }
   
    mapping(address => bool) public public_volunteers;
    address[] public public_volunteers_list;

    function addPublicVoluteers(address volunteer) public restricted {
        require(msg.sender == manager);
        require(isLastLevel);
        require(!public_volunteers[volunteer]);
        public_volunteers[volunteer] = true;
        public_volunteers_list.push(volunteer);
    }

    function give_public_opinion(uint index, bool opinion) public {
        require(isLastLevel);
        require(public_volunteers[msg.sender]);
        require(fundRequestsByChild[index].isPublicInvolved);
        require(!fundRequestsByChild[index].publicResponded[msg.sender]);
        fundRequestsByChild[index].publicResponded[msg.sender] = true;
        if(opinion){
            fundRequestsByChild[index].positivePublicResponseCount++;
        }
    }

    function percent(uint numerator, uint denominator, uint precision) private pure returns(uint quotient) {
        uint _numerator  = numerator * 10 ** (precision+1);
        // with rounding of last digit
        uint _quotient =  ((_numerator / denominator) + 5) / 10;
        return ( _quotient);
    }

    function getPotentialChildManagers() public view returns(address[]) {
        return potentialChildManagers;
    }
   
    function getFundRequestByChildsCount() public view returns (uint) {
        return fundRequestsByChild.length;  
    }
   
    function getFundRequestByManagersCount() public view returns (uint) {
        return fundIssuingsByManager.length;
    }

    function getSummary() public view returns (string, address, address, address, address[], address[], bool) {
        // A function which returns summary about this Fund instance
        return (
            briefDescription,
            manager,
            parentManager,
            parent,
            childFunds,
            potentialChildManagers,
            isLastLevel
        );
    }

    address public tenderAddress;
    function FloatTender() public restricted{
        //CHECKED
        require(!isTenderFinalized);
        require(isLastLevel);
        require(tenderAddress == 0);
        tenderAddress = new Bidding(msg.sender);
    }

    function FinalizeTender() public restricted{
        // CHECKED
        require(!isTenderFinalized);
        require(isLastLevel);
        require(CompanyAlloted == 0);
        require(tenderAddress !=0 );
        Bidding(tenderAddress).chooseLowestBidder(msg.sender);
        CompanyAlloted =  Bidding(tenderAddress).finalCompany();
        isTenderFinalized = true;
    }

}

contract Bidding{
   
    address public manager;
    uint public lowestBid;
    address public finalCompany;
    bool public tenderAlloted;
   
    function Bidding(address current_manager) public {
        tenderAlloted = false;
        manager = current_manager;
    }
   
    address[] public eligibleCompaniesList;
    mapping(address => bool) public isEligibleCompany;
   
    mapping(address => uint) public bids;
    address[] public biddersList;
   
   
    function addEligibleCompany(address company) public {
        // CHECKED
        require(!tenderAlloted);
        require(msg.sender == manager);
        require(!isEligibleCompany[company]);
        eligibleCompaniesList.push(company);
        isEligibleCompany[company] = true;
    }
   
    function bid(uint amount) public{
        // CHECKED
        require(!tenderAlloted);
        require(isEligibleCompany[msg.sender]);
        require(bids[msg.sender] == 0);
        bids[msg.sender] = amount;
        biddersList.push(msg.sender);
        if(biddersList.length == 1){
            lowestBid = amount;
            finalCompany = msg.sender;
        }
        else {
           
            if(amount < lowestBid){
                lowestBid = amount;
                finalCompany = msg.sender;
            }
           
        }
    }
   
    function chooseLowestBidder(address manager_) public {
        // CHECKED
        require(!tenderAlloted);
        require(manager_ == manager);
        require(biddersList.length >= 1);
        tenderAlloted = true;
    }

    function getEligibleCompanyList() public view returns(address[]) {
        return eligibleCompaniesList;
    }
   
}