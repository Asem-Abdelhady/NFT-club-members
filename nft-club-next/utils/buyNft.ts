import { ethers } from "ethers";
import getCotnract from "./getCotnract";

const buyNft = async (collectionId: number, username: string) => {
  const contract = await getCotnract();
  const tx = await contract?.buyNft(collectionId, username, {
    value: ethers.parseEther("0.0001"),
  });
  const receipt = await tx.wait();
  return receipt;
};

export default buyNft;
