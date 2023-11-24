"use client";
import { Box } from "@chakra-ui/react";
import ChatsList from "./components/Chats/ChatsList";
import getCotnract from "../../utils/getCotnract";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    const fetchContract = async () => {
      const newContract = await getCotnract();
      setContract(newContract);
    };

    fetchContract();
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      if (contract) {
        const newCollections = await contract.getCollections();
        setCollections(newCollections);
      }
    };

    fetchCollections();
  }, [contract]);

  return (
    <Box mt="20" marginRight="100px" marginLeft="500px">
      <ChatsList />
    </Box>
  );
}
