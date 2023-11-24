export interface networkConfigItem {
  blockConfirmations?: number;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  sepolia: {
    blockConfirmations: 6,
  },
};

export const developmentChains = ['hardhat', 'localhost'];
export const frontEndContractsFile = 'constants/nftClubAddress.json';
export const frontEndStorageFile = 'constants/nftClubStorage.json';
export const frontEndStorageAbiFile = 'constants/storage-abi.json';

export const frontEndAbiFile = 'constants/abi.json';
export const frontEndUrisFile = 'constants/current-uris.json';
export const frontEndConstantsFolder = 'constants';
