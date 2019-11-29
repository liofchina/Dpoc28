import Web3 from 'web3';

if (typeof window.ethereum === 'undefined') {
  alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
}

export var web3 = new Web3(window.web3.currentProvider);

// 账户切换
window.ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
  console.log("The Account is changed : " + accounts.toString());
});

// 网络切换
window.ethereum.on('networkChanged', function (result) {
  // Time to make sure your any calls are directed to the correct chain!
  console.log("The Network is changed : " + result.toString());
});

window.addEventListener("load", async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
});

// web3.shh.
