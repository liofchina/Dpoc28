export let certJson = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      },
      {
        "name": "_attrs",
        "type": "string"
      },
      {
        "name": "_did",
        "type": "string"
      },
      {
        "name": "_data",
        "type": "string"
      },
      {
        "name": "_isser",
        "type": "address"
      }
    ],
    "name": "applyCert",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      },
      {
        "name": "_status",
        "type": "uint256"
      },
      {
        "name": "_reason",
        "type": "string"
      },
      {
        "name": "_data",
        "type": "string"
      },
      {
        "name": "_sign",
        "type": "string"
      }
    ],
    "name": "handleCert",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "revokeCert",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_contractAddress",
        "type": "address"
      }
    ],
    "name": "setDPOC28DIDAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_contractAddress",
        "type": "address"
      }
    ],
    "name": "setDPOC28IssuerAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_id",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_isser",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_holder",
        "type": "address"
      }
    ],
    "name": "applyCertEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_id",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_status",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_handler",
        "type": "address"
      }
    ],
    "name": "handleCertEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_id",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_handler",
        "type": "address"
      }
    ],
    "name": "revokeCertEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "existsCert",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getCert",
    "outputs": [
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "id",
        "type": "string"
      },
      {
        "name": "attrs",
        "type": "string"
      },
      {
        "name": "did",
        "type": "string"
      },
      {
        "name": "reason",
        "type": "string"
      },
      {
        "name": "status",
        "type": "uint256"
      },
      {
        "name": "applyTime",
        "type": "uint256"
      },
      {
        "name": "issueTime",
        "type": "uint256"
      },
      {
        "name": "issuer",
        "type": "address"
      },
      {
        "name": "holder",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getCertApplyData",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getCertIssueData",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getCertSign",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getDidIndexs",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getHolder",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getHolderCertSize",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getHolderIndexs",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getIndex",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getIssuer",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getIssuerCertSize",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getIssuerIndexs",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSize",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
