const ipfsClient = require('ipfs-http-client');
let protocol = 'http';
// let domain = '127.0.0.1';
let domain = '112.74.163.192';
let apiPort = '5001';
let gatewayPort = '8801';
// http://localhost:8080/ipfs/
export let gatewayUrl = protocol + '://' + domain + ':' + gatewayPort + '/ipfs/';
// http://127.0.0.1:5001/api/v0/add
export let uploadUrl = protocol + '://' + domain + ':' + apiPort + '/api/v0/add';
export let ipfs = ipfsClient(domain, apiPort, {protocol: protocol});

// const {randomBytes} = require('crypto');
// var createKeccakHash = require('keccak');
// var secp256k1 = require('secp256k1');
// var Buffer = require('safe-buffer').Buffer;
// or connect with multiaddr
// var ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001')

// or using options
// var ipfs = ipfsClient({ host: 'localhost', port: '5001', protocol: 'http' })

// or specifying a specific API path
// var ipfs = ipfsClient({ host: '1.1.1.1', port: '80', 'api-path': '/ipfs/api/v0' })
//
// let obj = {
//   a: false,
//   b: "2222",
//   c: 1111
// };
// let a = new Buffer(JSON.stringify(obj), "utf8");
// ipfs.add(a).then((result) => {
//   console.log(result);
//   // resolve(result[0].hash);
//   ipfs.get(result[0].hash).then((data) => {
//     console.log(data[0])
//     console.log(Buffer(data[0].content).toString())
//   })
// }).catch((err) => {
//   console.error(err)
//   // reject(err);
// })
//
// ipfs.version().then((result) => {
//   console.log(result);
// });
