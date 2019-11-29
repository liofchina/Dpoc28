pragma solidity ^0.4.22;

import './Ownable.sol';
import './DPOC28DID.sol';
import './DPOC28Issuer.sol';

contract DPOC28Cert is Ownable {

    event applyCertEvent(uint _index, string _id, address _isser, address _holder);
    event handleCertEvent(uint _index, string _id, uint _status, address _handler);
    event revokeCertEvent(uint _index, string _id, address _handler);

    struct Cert {
        string id;
        string attrs;
        string did;
        string applyData;
        string issueData;
        string reason;
        string sign;
        uint status;// 1,3,4,9
        uint applyTime;
        uint issueTime;
    }

    Cert [] certList;
    mapping(string => uint) certIndex;
    mapping(string => uint[]) didCerts;
    mapping(address => uint[]) issuerCerts;
    mapping(address => uint[]) holderCerts;
    mapping(uint => address) certToIssuer;
    mapping(uint => address) certToHolder;
    DPOC28DID dpoc28did;
    DPOC28Issuer dpoc28issuer;

    modifier isExists(string memory _id) {
        require(existsCert(_id), "The Cert is not existed.");
        _;
    }

    modifier isIssuer(string memory _id) {
        require(msg.sender == getIssuer(_id), "You are not the issuer of this Cert.");
        _;
    }

    modifier isHolder(string memory _id) {
        require(msg.sender == getHolder(_id), "You are not the holder of this Cert.");
        _;
    }

    function setDPOC28DIDAddress(address _contractAddress) public onlyOwner {
        dpoc28did = DPOC28DID(_contractAddress);
    }

    function setDPOC28IssuerAddress(address _contractAddress) public onlyOwner {
        dpoc28issuer = DPOC28Issuer(_contractAddress);
    }

    function totalSize() public view returns (uint) {
        return certList.length;
    }

    function getIssuerCertSize() public view returns (uint){
        return issuerCerts[msg.sender].length;
    }

    function getHolderCertSize() public view returns (uint){
        return holderCerts[msg.sender].length;
    }

    function getIndex(string memory _id) public view returns (uint) {
        return certIndex[_id];
    }

    function getIssuer(string memory _id) public view returns (address) {
        return certToIssuer[getIndex(_id)];
    }

    function getHolder(string memory _id) public view returns (address) {
        return certToHolder[getIndex(_id)];
    }

    function getIssuerIndexs() public view returns (uint[]){
        return issuerCerts[msg.sender];
    }

    function getHolderIndexs() public view returns (uint[]){
        return holderCerts[msg.sender];
    }

    function getDidIndexs(string memory _id) public view returns (uint[]){
        return didCerts[_id];
    }

    function existsCert(string memory _id) public view returns (bool){
        uint index = getIndex(_id);
        Cert memory cert = certList[index];
        return keccak256(_id) == keccak256(cert.id);
    }

    function getCert(uint _index) public view returns (uint index, string id, string attrs, string did, string reason, uint status, uint applyTime, uint issueTime, address issuer, address holder) {
        if (_index >= totalSize()) {
            return;
        }
        Cert memory cert = certList[_index];
        return (_index, cert.id, cert.attrs, cert.did, cert.reason, cert.status, cert.applyTime, cert.issueTime, getIssuer(cert.id), getHolder(cert.id));
    }

    function getCertApplyData(string memory _id) public view isIssuer(_id) isExists(_id) returns (string, string){
        uint _index = getIndex(_id);
        Cert memory cert = certList[_index];
        return (cert.id, cert.applyData);
    }

    function getCertIssueData(string memory _id) public view isHolder(_id) isExists(_id) returns (string, string){
        uint _index = getIndex(_id);
        Cert memory cert = certList[_index];
        // 7 DAY
        if (now > cert.issueTime + 7 days) {
            return (cert.id, "");
        }
        return (cert.id, cert.issueData);
    }

    function getCertSign(string memory _id) public view isExists(_id) returns (string, string){
        uint _index = getIndex(_id);
        Cert memory cert = certList[_index];
        return (cert.id, cert.sign);
    }

    function applyCert(string _id, string _attrs, string _did, string _data, address _isser) external {
        require(keccak256(_id) != keccak256(""), "The _id can not be empty.");
        require(dpoc28did.existsDID(_did), "The _did is not existed.");
        require(dpoc28issuer.existsIssuer(_isser), "The _issuer is not existed.");

        Cert memory cert = Cert({
            id : _id, attrs : _attrs, did : _did, applyData : _data, issueData : "", reason : "", sign : "", status : 1, applyTime : now, issueTime : 0
            });

        uint index = certList.push(cert) - 1;
        certIndex[_id] = index;
        didCerts[_did].push(index);
        issuerCerts[_isser].push(index);
        holderCerts[msg.sender].push(index);
        certToIssuer[index] = _isser;
        certToHolder[index] = msg.sender;

        emit applyCertEvent(index, _id, _isser, msg.sender);
    }

    function handleCert(string _id, uint _status, string _reason, string _data, string _sign) external isIssuer(_id) isExists(_id) {
        require(3 == _status || 4 == _status, "The _status should be 3 or 4.");
        uint index = getIndex(_id);
        Cert storage cert = certList[index];

        require(1 == cert.status, "The Cert status is not 1.");

        if (3 == _status) {
            require(keccak256(_data) != keccak256(""), "The _data can not be empty.");
            require(keccak256(_sign) != keccak256(""), "The _sign can not be empty.");
            cert.status = _status;
            cert.issueData = _data;
            cert.sign = _sign;
            cert.issueTime = now;
        }

        if (4 == _status) {
            require(keccak256(_reason) != keccak256(""), "The _reason can not be empty.");
            cert.status = _status;
            cert.reason = _reason;
        }

        emit handleCertEvent(index, _id, _status, msg.sender);
    }

    function revokeCert(string _id) external isIssuer(_id) isExists(_id) {
        uint index = getIndex(_id);
        Cert storage cert = certList[index];
        require(3 == cert.status, "The Cert status is not 3.");
        cert.status = 9;
        emit revokeCertEvent(index, _id, msg.sender);
    }
}
