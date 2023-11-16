import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN = process.env.ETHERSCAN;
const config: HardhatUserConfig = {
    solidity: "0.8.19",
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: RPC_URL!,
            accounts: [PRIVATE_KEY!],
            chainId: 11155111,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN!,
    },

    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
};

export default config;