"use client";
import { Box, BoxProps } from "@chakra-ui/react";
import ChatsList from "./components/Chats/ChatsList";
import getCotnract from "../../utils/getCotnract";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Collection from "../../types/Collection";

export default function Home() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    setIsWalletConnected(!!localStorage.getItem("isWalletConnected"));
    const fetchCollections = async () => {
      if (localStorage.getItem("isWalletConnected") == "true") {
        const cont = await getCotnract();
        const createdCollections: Collection[] = [];
        let res: any[] = await cont?.getCurrentCollections();
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
  }, []);

  const boxProps = isWalletConnected ? {} : { style: { filter: "blur(4px)" } };

  return (
    <Box mt="20" marginRight="100px" marginLeft="500px" {...boxProps}>
      <ChatsList collections={collections} />
    </Box>
  );
}
