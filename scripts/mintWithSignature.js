const { StaticCeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const packAddress = require("../ContractAddresses/contractAddresses.json").packAddress;
const { ethers, Wallet } = require("ethers");
const pack = require("../artifacts/contracts/RandomPack.sol/Pack.json");
require('dotenv').config({path: '../.env'});

(async() => {
    // const ABI = ["function mint( uint256 amount, bytes memory data)"];
    // const iface = new ethers.utils.Interface(ABI);
    // const txData = iface.encodeFunctionData("mint", [1, "0x0000"]);
    // console.log("txData: ", txData);

    // const provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API_KEY);
    const provider = new StaticCeloProvider("https://alfajores-forno.celo-testnet.org");
    await provider.ready;
    const gasPrice = await provider.getGasPrice();
    const deployer = new CeloWallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);
    const contract = new ethers.Contract(packAddress, pack.abi, deployer);
    const tx = await contract.populateTransaction.mint(1, "0x0000", { from: deployer.address , value: 100000000000000, gasLimit: 16777216, gasPrice: gasPrice});
    console.log("tx: ", tx);
    console.log("tx.data: ", tx.data);
    const signedTx = await deployer.signTransaction(tx);
    console.log("signedTx: ", signedTx);
    
    const result = await provider.sendTransaction(signedTx);
    console.log(result);
})()
