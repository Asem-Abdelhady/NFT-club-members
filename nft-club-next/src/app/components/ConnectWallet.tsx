import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import connectWalletEthers from "../../../utils/connectWallet";
import { Button, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import NetworkErrorModal from "./NetWorkErrorModal";

const ConnectButton: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const bgColor = useColorModeValue("teal.400", "teal.200");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const connectWallet = async () => {
    if (account) {
      setAccount(null);
      localStorage.removeItem("isWalletConnected");
      window.location.reload();
    } else if (typeof window.ethereum !== "undefined") {
      try {
        localStorage.setItem("isWalletConnected", "false");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        if (Number(network.chainId) !== 11155111) {
          onOpen();
          return;
        }
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        localStorage.setItem("isWalletConnected", "true");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const checkIfWalletIsConnected = async () => {
    let walletInfo = await connectWalletEthers();
    if (walletInfo.provider && walletInfo.accounts.length > 0) {
      setAccount(walletInfo.accounts[0]);
    }
  };

  const formatAccountAddress = (address: string | null) => {
    if (address) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return "";
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <Button
        onClick={connectWallet}
        colorScheme="teal"
        bg={bgColor}
        _hover={{ bg: "teal.500" }}
      >
        {account
          ? `Connected: ${formatAccountAddress(account)}`
          : "Connect Wallet"}
      </Button>

      <NetworkErrorModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ConnectButton;
