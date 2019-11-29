pragma solidity ^0.4.22;

import './Ownable.sol';

contract DPOC28DID is Ownable {

    struct DID {
        string id;
        string name;
        string code;
        bool status;
    }

    DID [] didList;
    mapping(uint => address) didToOwner;
    mapping(address => uint[]) ownerDIDs;
    mapping(string => uint) didIndex;

    event registerDIDEvent(uint number, string id, string name, string code, address addr);
    event revokeDIDEvent(uint number, string id, address addr);


    modifier isExists(string memory _id) {
        require(existsDID(_id), "The DID is not existed.");
        _;
    }

    modifier isOwner(string memory _id) {
        uint number = getIndex(_id);
        require(msg.sender == didToOwner[number], "You are not the owner of this DID.");
        _;
    }

    function totalSize() public view returns (uint) {
        return didList.length;
    }

    function existsDID(string memory _id) public view returns (bool) {
        uint number = getIndex(_id);
        DID memory did = didList[number];
        return keccak256(_id) == keccak256(did.id);
    }

    function getIndex(string memory _id) public view returns (uint) {
        return didIndex[_id];
    }

    function getDID(string memory _id) public view isExists(_id) returns (uint, string, string, string, bool) {
        uint _index = getIndex(_id);
        DID memory did = didList[_index];
        return (_index, did.id, did.name, did.code, did.status);
    }

    function getDID(uint _index) public view returns (uint, string, string, string, bool){
        if (_index >= totalSize()) {
            return;
        }
        DID memory did = didList[_index];
        return (_index, did.id, did.name, did.code, did.status);
    }

    function registerDID(string _id, string _name, string _code) external {
        require(keccak256(_id) != keccak256(""), "The id is empty.");
        require(keccak256(_name) != keccak256(""), "The name is empty.");
        require(keccak256(_code) != keccak256(""), "The code is empty.");
        uint index = didList.push(DID(_id, _name, _code, true)) - 1;
        didToOwner[index] = msg.sender;
        ownerDIDs[msg.sender].push(index);
        didIndex[_id] = index;
        emit registerDIDEvent(index, _id, _name, _code, msg.sender);
    }

    function revokeDID(string _id) external isOwner(_id) isExists(_id) {
        uint index = getIndex(_id);
        DID storage did = didList[index];
        did.status = false;
        emit revokeDIDEvent(index, _id, msg.sender);
    }

    function ownerDIDSize() public view returns (uint){
        return ownerDIDs[msg.sender].length;
    }

    function ownerDIDIndexs() public view returns (uint[]) {
        return ownerDIDs[msg.sender];
    }
}
