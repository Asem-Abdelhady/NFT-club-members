import { ethers } from "ethers";
import WalletInfo from "../types/WalletInfo";

const connectWalletEthers = async () => {
  let walletInfo: WalletInfo = {
    provider: null,
    accounts: [],
  };
  if (
    typeof window.ethereum !== "undefined" &&
    localStorage.getItem("isWalletConnected")
  ) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.listAccounts();
    let accounts_addresses: string[] = [];
    if (accounts.length > 0) {
      accounts.map((account, index) => {
        accounts_addresses[index] = account.address;
      });
    }

    walletInfo.accounts = accounts_addresses;
    walletInfo.provider = provider;
  }
  return walletInfo;
};
export default connectWalletEthers;
