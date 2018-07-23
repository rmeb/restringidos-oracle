const logger = require('../utils/Logger')
const BN = require('bn.js')
const {generate, privateToAccount, sha3} = require('ethjs-account')
const SignerProvider = require('ethjs-provider-signer');
const {sign} = require('ethjs-signer');
const Eth = require('ethjs-query');
const EthContract = require('ethjs-contract');

const {RestrictedRegistry} = require('rmeb-contracts');

/**
* Definir la variable de entorno SECRET_KEY
**/
if (!process.env.SECRET_KEY) {
  throw new Error('Requiere variable de entorno SECRET_KEY')
}

let keys = privateToAccount(process.env.SECRET_KEY)
const provider = new SignerProvider('https://rinkeby.infura.io', {
  signTransaction: (rawTx, cb) => cb(null, sign(rawTx, keys.privateKey))
});
const eth = new Eth(provider);

const contract = new EthContract(eth);

const artifact = RestrictedRegistry.v1;
const abi = artifact.abi;
const bytecode = artifact.bytcode;
const addr = artifact.networks['4'].address;

const RestrictedRegistryContract = contract(abi);
const restrictedRegistry = RestrictedRegistryContract.at(addr);


/**
* Envia una transaccion a la red ethereum
**/
function sendTransaction(address, value) {
  logger.info('send tx ' + address)
  return new Promise((resolve, reject) => {
    eth.sendTransaction({
      from: keys.address,
      to: address,
      value: new BN(value),
      gas: 300000,
      data: '0x0',
    }, function(e, txHash) {
      if (e) reject(e)
      resolve({txHash})
    });
  })
}

function getAddress() {
  if (keys) return keys.address
  return ''
}
 
function setRestricted(codigo,restricted){
  logger.info('setRestricted: '+codigo+" -> "+ restricted);
  return new Promise((resolve,reject) => {
    restrictedRegistry.setRestricted(
      '0x'+codigo.toString(16),
      restricted,
      {from: keys.address, gas: 300000}, 
      function(e, txHash) {
        if (e) reject(e)
        resolve({txHash})
      });
  })
}

function isRestricted(codigo){
  logger.info('isRestricted: '+codigo);
  return restrictedRegistry.isRestricted('0x'+codigo.toString(16))
}

module.exports = {
  sendTransaction, getAddress, setRestricted, isRestricted
}
