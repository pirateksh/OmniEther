pragma solidity ^0.4.17;

contract Factory {
    // Stores address of Roots of Deployed Contracts.
    address[] public deployedRoots; 

    // Checks in O(1) whether a given address is Deployed Root or Not.
    mapping(address => bool) public isDeployedRoot; 
    
    // To pass 0 as address of parent of root node
    address temp; 
    
    function createRootNode(string description_) public payable {
        address newFund = new Fund(description_, temp, msg.sender, address(this), false);
        newFund.transfer(msg.value);
        isDeployedRoot[newFund] = true;
        deployedRoots.push(newFund); 
    }

    function createChildNode(string description_, address manager, bool is_last_level) public payable returns (address) {
        // require(isDeployedContract[msg.sender] == true); // Only already deployed contracts can call this function
        address newFund = new Fund(description_, msg.sender, manager, address(this), is_last_level);
        // deployedContracts.push(newFund);
        // isDeployedContract[newFund] = true;
        return newFund;
    }
    
    function rootTokenInjection(address rootAddress) public payable {
        // This functions injects money to an already deployed Fund Contract
        require(isDeployedRoot[rootAddress]);
        require(msg.sender == Fund(rootAddress).manager());   
        rootAddress.transfer(msg.value);
    }

    function getDeployedRoots() public view returns (address[]) {
        return deployedRoots;
    }
}


contract Fund {
    
    function() public payable { } // fallback Function to handle ether transaction inbetween Contracts.
    
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
        bool isReIssuing; // if Child again Asks for funds from parent.
        address selfAddress; // If Child asks for funds from parents, this will provide address of child contract
        // otherwise it is of no use (as of now)
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
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Fund(string description_, address newParent, address managerAddress, address factoryAddress, bool is_last_level) public {
        isLastLevel = is_last_level;
        
        isTenderFinalized = false;
        
        briefDescription = description_; 

        manager = managerAddress;
        factory = Factory(factoryAddress);

        if(newParent == 0) {
        	// This means that this node is root node
            parent = address(this);
            parentManager = manager;
        }
        else {
            parent = newParent;
            parentManager = Fund(parent).manager();
        }
    }
    
    
    function createfundRequestByChild(uint value, string description, bool is_last_level, bool is_reissuing) public {
        require(isPotentialChildManager[msg.sender]);    
        require(value <= address(this).balance);
        fundRequestByChild memory newRequest = fundRequestByChild({
            requestCreator: msg.sender,
            description: description,
            value: value,
            complete: false,
            approvedByCurrentManager: false,
            approvedByParentManager: false,
            isLastLevel: is_last_level,
            isReIssuing: is_reissuing,
            selfAddress: address(this)
        });
        
        fundRequestsByChild.push(newRequest);

    }
    
    function createfundRequestByManager(address assigned_manager ,string description,uint value, bool is_last_level) public restricted{
        require(isPotentialChildManager[assigned_manager]==true);
        require(value <= address(this).balance);
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
            InitializingMilestone(request.value, request.requestCreator);
        }
        else if(request.isReIssuing){
            request.selfAddress.transfer(request.value);
        }
        else{
            createChild(request.description, request.value, request.requestCreator, request.isLastLevel);
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
    
    function InitializingMilestone(uint amount, address company) public restricted{
        // Can be made private
        require(CompanyAlloted == company);
        require(isLastLevel);
        require(amount <= address(this).balance);
        company.transfer(amount); // can TRANSFER TOKEN
    }
    
    function addPotentialChildManager(address childManager) public restricted {
        require(isPotentialChildManager[childManager]==false);
        potentialChildManagers.push(childManager);
        isPotentialChildManager[childManager] = true;
    }
    
    function createChild(string description_, uint amount, address childManagerAddress, bool is_last_level) private restricted {
        // Private because this is not called directly by user or other contracts
        require(amount <= address(this).balance);
        require(isPotentialChildManager[childManagerAddress]);
        address child = factory.createChildNode(description_, childManagerAddress, is_last_level);
        childFunds.push(child);
        child.transfer(amount); // can TRANSFER TOKEN
    }

    function withdrawFunds() public {
        // Function to withdraw funds. This can be called
        // only by parentManager
        require(msg.sender == parentManager);
        parent.transfer(address(this).balance); // can TRANSFER TOKEN
    }
    
    function getChildFunds() public view returns(address[]) {
        return childFunds;
    }
    
    // function getCurrentBalance() public view returns(uint) {
    //     // This is for testing purpose. Can be removed later on 
    //     // as we can get balance using web3.eth.getBalance(address)
    //     return address(this).balance;
    // }
    
    function getPotentialChildManagers() public view returns(address[]) {
        return potentialChildManagers;
    }
    
    function getFundRequestByChildsCount() public view returns (uint) {
        return fundRequestsByChild.length;   
    }
    
    function getFundRequestByManagersCount() public view returns (uint) {
        return fundIssuingsByManager.length;
    }
    
    function getSummary() public view returns (
        string, address, address, address, address[], address[], bool
        ) {
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


    //Added NEW Bidding Code
    
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
