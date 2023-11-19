import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

import {
  developmentChains,
  frontEndAbiFile,
  frontEndContractsFile,
  networkConfig,
} from "../helper-hardhat-config";
import verify from "../utils/verify";
import updateChainAndAbiData from "../utils/write-contract-data";

const deploynftClub: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId!;

  const nftClub = await deploy("NftClub", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
  });

  updateChainAndAbiData(
    frontEndContractsFile,
    chainId,
    nftClub.address,
    frontEndAbiFile,
    nftClub.abi
  );

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
    await verify(nftClub.address, []);
  }
};

export default deploynftClub;
deploynftClub.tags = ["all", "nftClub"];
