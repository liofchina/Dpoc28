pragma solidity ^0.4.22;

import './Ownable.sol';
import './DPOC28Cert.sol';

contract DPOC28CertVerify is Ownable {

    struct CertVerify {
        string certId;
        string attrs;
        string data;
        uint status;// 1,3,4
        uint requestTime;
        uint responseTime;
    }

    DPOC28Cert dpoc28cert;
    CertVerify [] verifyList;
    mapping(address => uint[]) ownerCertVerifies;
    mapping(address => uint[]) holderCertVerifies;
    mapping(uint => address) certVerifyToOwner;
    mapping(uint => address) certVerifyToHolder;

    modifier isExists(uint _index) {
        require(existsCertVerify(_index), "The CertVerify is not existed.");
        _;
    }

    modifier isOwner(uint _index) {
        require(msg.sender == getOwner(_index), "You are not the Owner of this CertVerify.");
        _;
    }

    modifier isHolder(uint _index) {
        require(msg.sender == getHolder(_index), "You are not the Holder of this CertVerify.");
        _;
    }

    function setDPOC28CertAddress(address _contractAddress) public onlyOwner {
        dpoc28cert = DPOC28Cert(_contractAddress);
    }

    function totalSize() public view returns (uint) {
        return verifyList.length;
    }

    function existsCertVerify(uint _index) public view returns (bool) {
        return _index < totalSize();
    }

    function ownerCertVerifySize() public view returns (uint){
        return ownerCertVerifies[msg.sender].length;
    }

    function holderCertVerifySize() public view returns (uint){
        return holderCertVerifies[msg.sender].length;
    }

    function ownerCertVerifyIndexs() public view returns (uint[]) {
        return ownerCertVerifies[msg.sender];
    }

    function holderCertVerifyIndexs() public view returns (uint[]) {
        return holderCertVerifies[msg.sender];
    }

    function getOwner(uint _index) public view returns (address) {
        return certVerifyToOwner[_index];
    }

    function getHolder(uint _index) public view returns (address) {
        return certVerifyToHolder[_index];
    }

    function getCertVerify(uint _index) public view isExists(_index) returns (uint, string, string, uint, uint){
        CertVerify memory verify = verifyList[_index];
        return (_index, verify.certId, verify.attrs, verify.requestTime, verify.status);
    }

    function getCertVerifyResponseData(uint _index) public view isOwner(_index) isExists(_index) returns (uint, string){
        CertVerify memory verify = verifyList[_index];
        if (3 == verify.status) {
            return (_index, verify.data);
        }
        return (_index, "");
    }

    function getCertSign(string memory _certId) public view returns (string, string){
        return dpoc28cert.getCertSign(_certId);
    }

    function request(string _certId, string _attrs) external {
        require(dpoc28cert.existsCert(_certId), "The _certId is not existed.");
        CertVerify memory verify = CertVerify({
            certId : _certId, attrs : _attrs, data : "", status : 1, requestTime : now, responseTime : 0
            });
        address _holder = dpoc28cert.getHolder(_certId);
        uint index = verifyList.push(verify) - 1;

        ownerCertVerifies[msg.sender].push(index);
        holderCertVerifies[_holder].push(index);
        certVerifyToOwner[index] = msg.sender;
        certVerifyToHolder[index] = _holder;
    }

    function response(uint _index, string _data, uint _status) external isExists(_index) isHolder(_index) {
        require(3 == _status || 4 == _status, "The _status should be 3 or 4.");
        CertVerify storage verify = verifyList[_index];
        require(1 == verify.status, "The CertVerify status is not 1.");
        if (3 == _status) {
            require(keccak256(_data) != keccak256(""), "The _data can not be empty.");
            verify.data = _data;
        }
        verify.status = _status;
        verify.responseTime = now;
    }

}
