const { StaticCeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
require('dotenv').config({path: '../.env'});
const pack = require("../artifacts/contracts/RandomPack.sol/Pack.json");
const allAddresses = require("../ContractAddresses/contractAddresses.json");

async function main() {

    const provider = new StaticCeloProvider("https://alfajores-forno.celo-testnet.org");
    await provider.ready;
    const deployer = new CeloWallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);

    const contract = new ethers.Contract(allAddresses.packAddress, pack.abi, deployer);
    const gasPrice = await provider.getGasPrice();
    const tx = await contract.populateTransaction.openPack(0, 1, {  from: deployer.address, gasLimit: "0x3D090", gasPrice: gasPrice});
    console.log("tx: ", tx);
    console.log("tx.data: ", tx.data);
    const signedTx = await deployer.signTransaction(tx);
    console.log("signedTx: ", signedTx);

    const result = await provider.sendTransaction(signedTx);
    console.log(result);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
