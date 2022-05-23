const { StaticCeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
require('dotenv').config({path: '../.env'});
const packAddress = require("../ContractAddresses/contractAddresses.json").packAddress;
const pack = require("../artifacts/contracts/RandomPack.sol/Pack.json");

async function main() {

    const provider = new StaticCeloProvider("https://alfajores-forno.celo-testnet.org");
    await provider.ready;

    const deployer = new CeloWallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);
    const gasPrice = await provider.getGasPrice()
    const contract = new ethers.Contract(packAddress, pack.abi, deployer);
    let txResponse = await contract.mint(1, "0x0000", { from: deployer.address , value: "0x5AF3107A4000", gasLimit: "0x1000000", gasPrice: gasPrice});
    let txReceipt = await txResponse.wait();
    console.log("Pack minted: ", txReceipt.transactionHash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });


