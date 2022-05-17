const { StaticCeloProvider } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
require('dotenv').config({path: '../.env'});

async function getContractAddresses (address){
    const provider = new StaticCeloProvider(process.env.ALFAJORES_API);
    await provider.ready;
    const sender = String(address);
    var nonce = await provider.getTransactionCount(sender);
    var input_arr = [sender, ethers.BigNumber.from(nonce.toString()).toHexString()];
    var rlp_encoded = ethers.utils.RLP.encode(input_arr);
    
    var contract_address_long = ethers.utils.keccak256(rlp_encoded);
  
    var contract_address = "0x"+contract_address_long.substring(24); //Trim the first 24 characters.
    return contract_address;
}

module.exports = {getContractAddresses};