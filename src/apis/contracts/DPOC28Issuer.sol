pragma solidity ^0.4.22;

import './Ownable.sol';

contract DPOC28Issuer is Ownable {

    struct Issuer {
        address addr;
        string name;
        string code;
        bool status;
    }

    constructor() public {
        owner = msg.sender;
        Issuer memory issuer = Issuer(owner, "admin", "admin", true);
        uint index = issuerList.push(issuer) - 1;
        addrToIndex[owner] = index;
        emit createIssuerEvent(index, issuer.addr, issuer.name, issuer.code);
    }

    Issuer [] issuerList;
    mapping(address => uint) addrToIndex;

    event createIssuerEvent(uint number, address addr, string name, string code);
    event revokeIssuerEvent(uint number, address addr);

    modifier isExists(address _addr) {
        require(existsIssuer(_addr), "The issuer is not existed.");
        _;
    }

    function totalSize() public view returns (uint) {
        return issuerList.length;
    }

    function getIndex(address _addr) public view returns (uint) {
        return addrToIndex[_addr];
    }

    function existsIssuer() public view returns (bool) {
        return existsIssuer(msg.sender);
    }

    function existsIssuer(address _addr) public view returns (bool) {
        uint index = getIndex(_addr);
        Issuer memory issuer = issuerList[index];
        return _addr == issuer.addr;
    }

    function getIssuer(address _addr) public view isExists(_addr) returns (uint, address, string, string, bool){
        uint index = getIndex(_addr);
        Issuer memory issuer = issuerList[index];
        return (index, issuer.addr, issuer.name, issuer.code, issuer.status);
    }

    function getIssuer(uint _index) public view returns (uint, address, string, string, bool){
        if (_index >= totalSize()) {
            return;
        }
        Issuer memory issuer = issuerList[_index];
        return (_index, issuer.addr, issuer.name, issuer.code, issuer.status);
    }

    function createIssuer(address addr, string name, string code) external onlyOwner returns (uint) {
        require (!existsIssuer(addr), "The issuer is existed.");
        require (keccak256(name) != keccak256(""), "The name is empty.");
        uint index = issuerList.push(Issuer(addr, name, code, true)) - 1;
        addrToIndex[addr] = index;
        emit createIssuerEvent(index, addr, name, code);
        return index;
    }

    function revokeIssuer(address _addr) external onlyOwner isExists(_addr) {
        uint index = getIndex(_addr);
        Issuer storage issuer = issuerList[index];
        issuer.status = false;
        emit revokeIssuerEvent(index, _addr);
    }

    function validIndexs() public view returns (uint[]) {
        uint total = totalSize();
        uint[] memory result = new uint256[](total);
        uint resultIndex = 0;
        uint index;
        for (index = 0; index < total; index++) {
            Issuer memory issuer = issuerList[index];
            if (issuer.status) {
                result[resultIndex] = index;
                resultIndex++;
            }
        }
        return result;
    }
}
