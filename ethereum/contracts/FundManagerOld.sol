pragma solidity ^0.4.17;

contract Factory {
    
    address[] public deployedContracts;
    mapping(address => bool) public isDeployedContract;
    address public factoryManager;
    address temp;
    
    struct parentCreationRequest{
        address requestCreator;
        string description;
        uint value;
        bool complete;
    }
    struct parentMoneyInjectionRequest{
        address requestCreator;
        address parent;
        uint value;
        bool complete;
    }
    
    parentCreationRequest[] public parentCreationRequests;
    parentMoneyInjectionRequest[] public parentMoneyInjectionRequests;

    function createParentCreationRequest(string description_) public payable{
        parentCreationRequest memory request = parentCreationRequest({
            requestCreator: msg.sender,
            description: description_,
            value: msg.value,
            complete: false
        });
        parentCreationRequests.push(request);
    }
    
    function createParentMoneyInjectionRequest(address parentAddress) public payable {
        require(isDeployedContract[parentAddress]);
        require(msg.sender == Fund(parentAddress).manager());
        parentMoneyInjectionRequest memory request = parentMoneyInjectionRequest({
            parent: parentAddress,
            requestCreator: msg.sender,
            value: msg.value,
            complete: false
        });
        parentMoneyInjectionRequests.push(request);
    }
    
    function finalizeParentCreationRequest(uint index) public{
        // Check if this injection is only for Parent Node.
        parentCreationRequest storage request = parentCreationRequests[index];
        require(msg.sender == factoryManager);
        require(!request.complete);
        request.complete = true;
        
        // creating new parent fund in response to the request just completed.
        address newFund = new Fund(request.description, temp, request.requestCreator, address(this), false);
        deployedContracts.push(newFund);
        isDeployedContract[newFund] = true;
        newFund.transfer(request.value); // can TRANSFER TOKEN
    }
    
    function finalizeParentMoneyInjectionRequest(uint index) public{
        parentMoneyInjectionRequest storage request = parentMoneyInjectionRequests[index];
        require(msg.sender == factoryManager);
        require(!request.complete);
        require(isDeployedContract[request.parent]);
        request.complete = true;
        request.parent.transfer(request.value); // can TRANSFER TOKEN
    }
    
    
    function Factory() public {
        factoryManager = msg.sender;
    }
    
    
    function createFund(string description_, address manager, bool is_last_level) public returns (address) {
        require(isDeployedContract[msg.sender] == true); // Only already deployed contracts can call this function
        address newFund = new Fund(description_, msg.sender, manager, address(this), is_last_level);
        deployedContracts.push(newFund);
        isDeployedContract[newFund] = true;
        return newFund;
    }
    
    function getFactoryBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getDeployedContracts() public view returns (address[]) {
        return deployedContracts;
    }

    function getParentCreationRequestsCount() public view returns (uint) {
        return parentCreationRequests.length;
    }
    
    function getParentMoneyInjectionRequestsCount() public view returns (uint) {
        return parentMoneyInjectionRequests.length;
    }
    
}


contract Fund {
    
    function() public payable { } // fallback Function to handle ether transaction inbetween Contracts.
    
    struct FundAllotmentRequest {
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
    }
    
    struct FundIssuingRequest {
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
    bool isLastLevel;
    address public parent;
    // ParentFund reference can also be stored like
    // Fund parentFund = Fund(parent)
    address public manager;
    address public parentManager;
    Factory public factory;
    
    address[] public childFunds;
    address[] public potentialChildManagers;
    
    FundAllotmentRequest[] public fundAllotmentRequests;
    FundIssuingRequest[] public fund_issuing_requests;
    
    mapping(address => bool) public isPotentialChildManager;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Fund(string description_, address newParent, address managerAddress, address factoryAddress, bool is_last_level) public {
        isLastLevel = is_last_level;
        
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
    
    
    function createFundAllotmentRequest(uint value, string description, bool is_last_level) public {
        require(isPotentialChildManager[msg.sender]);    
        require(value <= address(this).balance);
        FundAllotmentRequest memory newRequest = FundAllotmentRequest({
            requestCreator: msg.sender,
            description: description,
            value: value,
            complete: false,
            approvedByCurrentManager: false,
            approvedByParentManager: false,
            isLastLevel: is_last_level
        });
        
        fundAllotmentRequests.push(newRequest);
    }
    
    function createFundIssuingRequest(address assigned_manager ,string description,uint value, bool is_last_level) public restricted{
        require(isPotentialChildManager[assigned_manager]==true);
        require(value <= address(this).balance);
        FundIssuingRequest memory newFundIssuingRequest = FundIssuingRequest({
            requestCreator: msg.sender,
            assigned_manager: assigned_manager,
            description: description,
            value: value,
            complete: false,
            approvedByParentManager: false,
            isLastLevel: is_last_level
        });
        
        fund_issuing_requests.push(newFundIssuingRequest);
        
    }

    
    function approveFundAllotmentRequest(uint index) public {
        require(msg.sender == parentManager || msg.sender == manager);
        FundAllotmentRequest storage request = fundAllotmentRequests[index];
        
        if(msg.sender == parentManager) {
            require(!request.approvedByParentManager);
            request.approvedByParentManager = true;
        }
        if(msg.sender == manager) {
            require(!request.approvedByCurrentManager);
            request.approvedByCurrentManager = true;
        }
    }
    
    function approveFundIssuingRequest(uint index) public{
        // CHECK THIS FUNCTION
        require(msg.sender == parentManager);
        FundIssuingRequest storage request = fund_issuing_requests[index];
        require(!request.approvedByParentManager);
        request.approvedByParentManager= true;
    }
    
    function finalizeFundAllotmentRequest(uint index) public restricted {
        FundAllotmentRequest storage request = fundAllotmentRequests[index];
        
        require(!request.complete);
        require(request.approvedByCurrentManager);
        require(request.approvedByParentManager);
        if(isLastLevel){
            request.complete = true;
            InitializingMilestone(request.value, request.requestCreator);
        }
        else{
            createChild(request.description, request.value, request.requestCreator, request.isLastLevel);
        }
        request.complete = true;
    }
    
    function finalizeFundIssuingRequest(uint index) public restricted {
        FundIssuingRequest storage request = fund_issuing_requests[index]; // storage means don't create a new copy i.e. work on original copy.
        
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
        require(isPotentialChildManager[company]);
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
        address child = factory.createFund(description_, childManagerAddress, is_last_level);
        childFunds.push(child);
        child.transfer(amount); // can TRANSFER TOKEN
    }
    
    function getChildFunds() public view returns(address[]) {
        return childFunds;
    }
    
    function getCurrentBalance() public view returns(uint) {
        // This is for testing purpose. Can be removed later on 
        // as we can get balance using web3.eth.getBalance(address)
        return address(this).balance;
    }
    
    function getPotentialChildManagers() public view returns(address[]) {
        return potentialChildManagers;
    }
    
    // New functions added
    
    function withdrawFunds() public {
        // Function to withdraw funds. This can be called
        // only by parentManager
        require(msg.sender == parentManager);
        parent.transfer(address(this).balance); // can TRANSFER TOKEN
    }
    
    function getFundAllotmentRequestsCount() public view returns (uint) {
        return fundAllotmentRequests.length;   
    }
    
    function getFundIssuingRequestsCount() public view returns (uint) {
        return fund_issuing_requests.length;
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
}