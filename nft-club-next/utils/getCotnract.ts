import { ethers } from "ethers";
import getContractAbi from "./getContractAbi";
import getContractAddress from "./getContractAddress";
import connectWalletEthers from "./connectWallet";

const getCotnract = async () => {
  const abi = getContractAbi();
  const address = await getContractAddress();
  const walletInfo = await connectWalletEthers();
  const contract = new ethers.Contract(address, abi, walletInfo.provider);
  return contract;
};

export default getCotnract;
