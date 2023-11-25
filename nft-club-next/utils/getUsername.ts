import connectWalletEthers from "./connectWallet";
import getCotnract from "./getCotnract";

const getUsername = async (selectedId: number) => {
  const contract = await getCotnract();
  const walletInfo = await connectWalletEthers();
  const address = walletInfo.accounts[0];
  const receipt = await contract?.getNftOwnerInfo(selectedId, address);

  return receipt;
};

export default getUsername;
