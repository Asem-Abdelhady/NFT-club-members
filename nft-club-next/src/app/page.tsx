"use client";
import { Box } from "@chakra-ui/react";
import ChatsList from "./components/Chats/ChatsList";
import getCotnract from "../../utils/getCotnract";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Collection from "../../types/Collection";

export default function Home() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [collections, setCollections] = useState<any[]>([]);
  console.log("Collections: ", collections);

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
        const createdCollections: Collection[] = [];
        let res: any[] = await contract.getCurrentCollections();
        res.forEach((collectionFetched, index) => {
          let collection = {
            id: index,
            address: collectionFetched[0],
            price: collectionFetched[1].toString(),
            uri: collectionFetched[3],
            name: collectionFetched[2],
          };

          createdCollections.push(collection);
        });

        setCollections(createdCollections);
      }
    };

    fetchCollections();
  }, [contract]);

  return (
    <Box mt="20" marginRight="100px" marginLeft="500px">
      <ChatsList collections={collections} />
    </Box>
  );
}
