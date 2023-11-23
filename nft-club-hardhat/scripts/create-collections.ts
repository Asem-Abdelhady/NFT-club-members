import { readFileSync, writeFileSync } from 'fs';
import {
  frontEndContractsFile,
  frontEndUrisFile,
} from '../helper-hardhat-config';
import { ethers, getNamedAccounts, deployments, network } from 'hardhat';
import { NftClub } from '../typechain-types';
import ChainData from '../types/ChainData';
import Collection from '../types/Collection';

async function main() {
  const contractAddress = readFileSync(frontEndContractsFile, 'utf-8');
  const { deployer } = await getNamedAccounts();

  let chainData: ChainData = {};
  if (contractAddress) {
    try {
      chainData = JSON.parse(contractAddress);
    } catch (error) {
      console.error('Error parsing chain data JSON:', error);
      return;
    }
  }

  const chainId = network.config.chainId!;

  if (!chainData[chainId]) {
    console.error(`Contract address not found for chain ID ${chainId}`);
    return;
  }

  const nftClubAddress = chainData[chainId];
  console.log('Address: ', nftClubAddress);
  let nftClub: NftClub;
  let accounts = await ethers.getSigners();
  await deployments.fixture(['all', 'nftClub']);
  const nftClubContract = await ethers.getContractAt('NftClub', nftClubAddress);
  nftClub = nftClubContract.connect(accounts[0]);

  // Hardcoded URIs and names for four collections
  const collectionsData = [
    { name: 'Collection1', uri: 'URI1' },
    { name: 'Collection2', uri: 'URI2' },
    { name: 'Collection3', uri: 'URI3' },
    { name: 'Collection4', uri: 'URI4' },
  ];

  for (const data of collectionsData) {
    const name = data.name;
    const uri = data.uri;
    const symbol = name;
    const price = ethers.parseEther('0.1');
    await nftClub.createCollection(name, symbol, price, uri);
  }

  const createdCollections: Collection[] = [];
  let res = await nftClub.getCurrentCollections();
  res.forEach((collectionFetched, index) => {
    let collection: Collection = {};

    collection[collectionFetched[2]] = {
      id: index,
      address: collectionFetched[0],
      price: collectionFetched[1].toString(),
      uri: collectionFetched[3],
    };

    createdCollections.push(collection);
  });

  writeFileSync(frontEndUrisFile, JSON.stringify(createdCollections, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
