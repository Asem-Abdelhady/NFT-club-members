import { ethers } from "ethers";
import getCotnract from "./getCotnract";

const buyNft = async (collectionId: number) => {
  const contract = await getCotnract();
  const tx = await contract.buyNft(collectionId, {
    value: ethers.parseEther("0.0001"),
  });
  const receipt = await tx.wait();
  return receipt;
};

export default buyNft;
