export let issuerJson = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "revokeIssuer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "existsIssuer",
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
    "inputs": [],
    "name": "existsIssuer",
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
    "inputs": [],
    "name": "validIndexs",
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
    "inputs": [
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getIssuer",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
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
    "constant": false,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "code",
        "type": "string"
      }
    ],
    "name": "createIssuer",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
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
  // {
  //   "constant": true,
  //   "inputs": [
  //     {
  //       "name": "_addr",
  //       "type": "address"
  //     }
  //   ],
  //   "name": "getIssuer",
  //   "outputs": [
  //     {
  //       "name": "",
  //       "type": "uint256"
  //     },
  //     {
  //       "name": "",
  //       "type": "address"
  //     },
  //     {
  //       "name": "",
  //       "type": "string"
  //     },
  //     {
  //       "name": "",
  //       "type": "string"
  //     },
  //     {
  //       "name": "",
  //       "type": "bool"
  //     }
  //   ],
  //   "payable": false,
  //   "stateMutability": "view",
  //   "type": "function"
  // },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "number",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "code",
        "type": "string"
      }
    ],
    "name": "createIssuerEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "number",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "revokeIssuerEvent",
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
  }
]
