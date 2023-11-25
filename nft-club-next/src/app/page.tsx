"use client";
import { Box, BoxProps } from "@chakra-ui/react";
import ChatsList from "./components/Chats/ChatsList";
import getCotnract from "../../utils/getCotnract";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Collection from "../../types/Collection";
import getUsername from "../../utils/getUsername";

export default function Home() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isWalletConnected, setisWalletConnected] = useState(
    localStorage.getItem("isWalletConnected") || ""
  );
  useEffect(() => {
    if (isWalletConnected) {
      const fetchContract = async () => {
        const newContract = await getCotnract();
        setContract(newContract!);
      };

      fetchContract();
    }
  }, [isWalletConnected]);

  useEffect(() => {
    const fetchCollections = async () => {
      if (contract && isWalletConnected) {
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
      } else {
        const dummyCollections: Collection[] = [
          {
            id: 1,
            address: "0x12345",
            price: "100",
            uri: "https://dummy-uri.com",
            name: "Dummy Collection 1",
          },
          {
            id: 2,
            address: "0x67890",
            price: "200",
            uri: "https://dummy-uri-2.com",
            name: "Dummy Collection 2",
          },
        ];

        setCollections(dummyCollections);
      }
    };

    fetchCollections();
  }, [contract, isWalletConnected]);

  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.key === "isWalletConnected") {
        setisWalletConnected(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const boxProps: BoxProps = isWalletConnected
    ? {}
    : { style: { filter: "blur(4px)" } };

  return (
    <Box mt="20" marginRight="100px" marginLeft="500px" {...boxProps}>
      <ChatsList collections={collections} />
    </Box>
  );
}
