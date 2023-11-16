import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

import { networkConfig } from "../helper-hardhat-config";

const deployLock: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const chainId = network.config.chainId;
    const lockedAmount = ethers.parseEther("0.000001");
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);

    const lock = await deploy("Lock", {
        from: deployer,
        args: [currentTimestampInSeconds.toString()],
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
    });
};

export default deployLock;
deployLock.tags = ["all", "Lock"];
