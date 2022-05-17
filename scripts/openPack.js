const { StaticCeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
require('dotenv').config({path: '../.env'});
const pack = require("../artifacts/contracts/RandomPack.sol/Pack.json");

async function main() {

    const provider = new StaticCeloProvider("https://alfajores-forno.celo-testnet.org");
    await provider.ready;
    const deployer = new CeloWallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);
    const elementalAddress = "0xe5d93B98CB07E6c16fe481f5C1fa62Fe0d19D8ef";
    const fungiAddress = "0x28f8f8D0F095CF38d5b875a7fB6FCDa9F802a939";
    const insectAddress = "0x21CCe773901F11ce222f2576a5BE3f89cB858012";
    const plantAddress = "0x779f49FE2198BeF1381BA4e76c47C3dAfEc5D45f";
    const packAddress = "0xeCB9b8F323376Aa66aFe4825f2cc053777fC0061";

    const contract = new ethers.Contract(packAddress, pack.abi, deployer);
    txResponse = await contract.openPack(deployer.address, 3, 1, insectAddress, fungiAddress, plantAddress, elementalAddress, { from: deployer.address});
    txReceipt = await txResponse.wait();
    console.log("Pack opened: ", txReceipt.transactionHash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
