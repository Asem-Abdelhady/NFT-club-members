import { nftClubAddress } from "../constants";
import connectWalletEthers from "./connectWallet";

interface contractAddressesInterface {
  [key: number]: string;
}

const getContractAddress = async () => {
  const addresses: contractAddressesInterface = nftClubAddress;
  const walletInfo = await connectWalletEthers();
  console.log("Wallet is", walletInfo);

  const chainId = (await walletInfo.provider?.getNetwork())!.chainId;
  const address: string = addresses[Number(chainId)];
  return address;
};

export default getContractAddress;
