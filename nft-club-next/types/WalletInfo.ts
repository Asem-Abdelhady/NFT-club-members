import { ethers } from "ethers";

export default interface WalletInfo {
  provider: ethers.BrowserProvider | null;
  accounts: string[];
}
