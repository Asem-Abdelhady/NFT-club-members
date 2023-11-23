import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

import {
  developmentChains,
  frontEndStorageAbiFile,
  frontEndStorageFile,
  networkConfig,
} from '../helper-hardhat-config';
import verify from '../utils/verify';
import updateChainAndAbiData from '../utils/write-contract-data';

const deploynftClubStorage: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId!;

  const nftClubStorage = await deploy('NftClubStorage', {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
  });

  updateChainAndAbiData(
    frontEndStorageFile,
    chainId,
    nftClubStorage.address,
    frontEndStorageAbiFile,
    nftClubStorage.abi
  );

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
    await verify(nftClubStorage.address, []);
  }
};

export default deploynftClubStorage;
deploynftClubStorage.tags = ['all', 'nftClubStorage'];
