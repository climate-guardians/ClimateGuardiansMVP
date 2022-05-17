const { StaticCeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
require('dotenv').config({path: '../.env'});
const pack = require("../artifacts/contracts/RandomPack.sol/Pack.json");

async function main() {

    const provider = new StaticCeloProvider("https://alfajores-forno.celo-testnet.org");
    await provider.ready;

    const deployer = new CeloWallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);

    const packAddress = "0xeCB9b8F323376Aa66aFe4825f2cc053777fC0061";

    const contract = new ethers.Contract(packAddress, pack.abi, deployer);
    let txResponse = await contract.mint(deployer.address, 3, 1, "0x0000", { from: deployer.address , value: "0x2386f26fc10000"});
    let txReceipt = await txResponse.wait();
    console.log("Pack minted: ", txReceipt.transactionHash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });


