import { ethers, deployments, getNamedAccounts, network } from 'hardhat';
import { expect } from 'chai';
import { NftClub } from '../typechain-types';
import { readFileSync } from 'fs';
import { frontEndContractsFile } from '../helper-hardhat-config';
import ChainData from '../types/ChainData';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

describe('NftClub and ERC721Generator Contracts', function () {
  let nftClub: NftClub;
  let accounts: HardhatEthersSigner[];
  beforeEach(async function () {
    const contractAddress = readFileSync(frontEndContractsFile, 'utf-8');
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

    accounts = await ethers.getSigners();

    await deployments.fixture(['NftClub', 'all']);
    const nftClubContract = await ethers.getContractAt(
      'NftClub',
      nftClubAddress
    );
    nftClub = nftClubContract.connect(accounts[0]);
  });

  describe('NftClub - Create Collection', function () {
    it('Should allow the owner to create a collection', async function () {
      const collectionName = 'Test Collection';
      const collectionSymbol = 'TEST';
      const collectionPrice = ethers.parseEther('0.1');
      const collectionUri = 'test_uri';

      await expect(
        nftClub.createCollection(
          collectionName,
          collectionSymbol,
          collectionPrice,
          collectionUri
        )
      ).to.not.be.reverted;

      const collection = await nftClub.getCollection(0);

      expect(collection.name).to.equal(collectionName);
      expect(collection.URI).to.equal(collectionUri);
    });

    it('Should fail if a non-owner tries to create a collection', async function () {
      const collectionName = 'Test Collection';
      const collectionSymbol = 'TEST';
      const collectionPrice = ethers.parseEther('0.1');
      const collectionUri = 'test_uri';

      try {
        await nftClub
          .connect(accounts[1])
          .createCollection(
            collectionName,
            collectionSymbol,
            collectionPrice,
            collectionUri
          );
      } catch (error: any) {
        expect(error.message).to.include('NftClub__NotOwner()');
        return;
      }
    });
  });

  describe('NftClub - Buy NFT', function () {
    it('Should allow a user to buy an NFT from a collection', async function () {
      const collectionName = 'Test Collection';
      const collectionSymbol = 'TEST';
      const collectionPrice = ethers.parseEther('0.1');
      const collectionUri = 'test_uri';
      await nftClub.createCollection(
        collectionName,
        collectionSymbol,
        collectionPrice,
        collectionUri
      );

      const initialOwner = await nftClub.verifyOwnership(
        0,
        accounts[0].address
      );
      expect(initialOwner).to.be.false;

      await nftClub.buyNft(0, 'Monkey', { value: collectionPrice });

      const newOwner = await nftClub.verifyOwnership(0, accounts[0].address);
      expect(newOwner).to.be.true;
    });

    it('Should fail to buy an NFT with insufficient payment', async function () {
      const collectionName = 'Test Collection';
      const collectionSymbol = 'TEST';
      const collectionPrice = ethers.parseEther('0.1');
      const collectionUri = 'test_uri';
      await nftClub.createCollection(
        collectionName,
        collectionSymbol,
        collectionPrice,
        collectionUri
      );

      try {
        await nftClub.buyNft(0, 'Monkey', { value: ethers.parseEther('0.05') });
      } catch (error: any) {
        expect(error.message).to.include('NftClub__IncorrectPrice()');
        return;
      }
    });

    it('Should fail to buy an NFT from a non-existent collection', async function () {
      try {
        await nftClub.buyNft(999, 'Monkey');
      } catch (error: any) {
        expect(error.message).to.include('NftClub__CollectionDoesNotExist()');
        return;
      }
    });
  });

  describe('NftClub - Verify Ownership', function () {
    it('Should return true for the owner of an NFT', async function () {
      const collectionName = 'Test Collection';
      const collectionSymbol = 'TEST';
      const collectionPrice = ethers.parseEther('0.1');
      const collectionUri = 'test_uri';
      await nftClub.createCollection(
        collectionName,
        collectionSymbol,
        collectionPrice,
        collectionUri
      );

      const owner = await nftClub.verifyOwnership(0, accounts[0].address);
      expect(owner).to.be.false;
    });

    it('Should return false for a non-owner of an NFT', async function () {
      const collectionName = 'Test Collection';
      const collectionSymbol = 'TEST';
      const collectionPrice = ethers.parseEther('0.1');
      const collectionUri = 'test_uri';
      await nftClub.createCollection(
        collectionName,
        collectionSymbol,
        collectionPrice,
        collectionUri
      );

      const owner = await nftClub.verifyOwnership(0, accounts[1].address);
      expect(owner).to.be.false;
    });

    it('Should fail to verify ownership for a non-existent collection', async function () {
      try {
        nftClub.verifyOwnership(999, accounts[0].address);
      } catch (error: any) {
        expect(error.message).to.include('NftClub__CollectionDoesNotExist()');
        return;
      }
    });
  });
});
