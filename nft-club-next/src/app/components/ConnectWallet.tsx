import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import connectWalletEthers from "../../../utils/connectWallet";
import { Button, useColorModeValue } from "@chakra-ui/react";

const ConnectButton: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const bgColor = useColorModeValue("blue.500", "blue.300");

  const connectWallet = async () => {
    if (account) {
      setAccount(null);
      localStorage.removeItem("isWalletConnected");
    } else if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        localStorage.setItem("isWalletConnected", "true");
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
    <Button
      onClick={connectWallet}
      colorScheme="teal"
      bg={bgColor}
      _hover={{ bg: "blue.600" }}
    >
      {account
        ? `Connected: ${formatAccountAddress(account)}`
        : "Connect Wallet"}
    </Button>
  );
};

export default ConnectButton;
