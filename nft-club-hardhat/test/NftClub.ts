import { ethers, deployments, getNamedAccounts, network } from "hardhat";
import { expect } from "chai";
import { NftClub, ERC721Generator } from "../typechain-types";
import { readFileSync, writeFileSync } from "fs";
import { frontEndContractsFile } from "../helper-hardhat-config";
import ChainData from "../types/ChainData";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("NftClub and ERC721Generator Contracts", function () {
  let nftClub: NftClub;
  let deployer: string;
  let otherAccount: string;
  let accounts: HardhatEthersSigner[];
  beforeEach(async function () {

    const contractAddress = readFileSync(frontEndContractsFile, "utf-8");
  
    let chainData: ChainData = {};
    if (contractAddress) {
      try {
        chainData = JSON.parse(contractAddress);
      } catch (error) {
        console.error("Error parsing chain data JSON:", error);
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
    deployer = accounts[0].address;
    otherAccount = accounts[1].address;

    await deployments.fixture(["NftClub", "ERC721Generator"]);
    const nftClubContract = await ethers.getContractAt("NftClub", nftClubAddress);
    nftClub = nftClubContract.connect(accounts[0]);
  });

  describe("NftClub - Create Collection", function () {
    it("Should allow the owner to create a collection", async function () {
      const collectionName = "Test Collection";
      const collectionSymbol = "TEST";
      const collectionPrice = ethers.utils.parseEther("0.1");
      const collectionUri = "test_uri";
  
      await expect(
        nftClub.createCollection(
          collectionName,
          collectionSymbol,
          collectionPrice,
          collectionUri
        )
      ).to.not.be.reverted;
  
      const collection = await nftClub.s_collections(0);
      expect(collection.name).to.equal(collectionName);
      expect(collection.URI).to.equal(collectionUri);
    });
  
    it("Should fail if a non-owner tries to create a collection", async function () {
      const collectionName = "Test Collection";
      const collectionSymbol = "TEST";
      const collectionPrice = ethers.utils.parseEther("0.1");
      const collectionUri = "test_uri";
  
      await expect(
        nftClub.connect(accounts[1]).createCollection(
          collectionName,
          collectionSymbol,
          collectionPrice,
          collectionUri
        )
      ).to.be.revertedWith("NftClub__NotOwner");
    });
  
  });
  

});
