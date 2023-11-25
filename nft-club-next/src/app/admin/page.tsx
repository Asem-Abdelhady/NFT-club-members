"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import getCotnract from "../../../utils/getCotnract";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  Center,
  useToast,
} from "@chakra-ui/react";
import getOwner from "../../../utils/getOwner";
import NotOwnerModal from "../components/NotOwnerModal";

interface CollectionDetails {
  name: string;
  symbol: string;
  price: number;
  uri: string;
}
export default function Admin() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [showNotOwnerModal, setShowNotOwnerModal] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>(
    {
      name: "",
      symbol: "",
      price: 0,
      uri: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const toast = useToast();

  async function handleCreateCollection() {
    if (
      contract &&
      collectionDetails.name &&
      collectionDetails.symbol &&
      collectionDetails.price &&
      collectionDetails.uri
    ) {
      const owner = await getOwner();
      setIsLoading(true); // Set loading state to true while creating collection
      try {
        const tx = await contract.createCollection(
          collectionDetails.name,
          collectionDetails.symbol,
          ethers.parseEther(collectionDetails.price.toString()),
          collectionDetails.uri
        );
        const receipt = await tx.wait();
        console.log(receipt);
        toast({
          title: "Collection created.",
          description: "The NFT collection has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCollectionDetails({
          name: "",
          symbol: "",
          price: 0,
          uri: "",
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error creating collection:", error);
        setOwnerAddress(owner);
        setShowNotOwnerModal(true);
        toast({
          title: "Error",
          description: "There was an error creating the collection.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create a collection.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    const fetchContract = async () => {
      const newContract = await getCotnract();
      setContract(newContract!);
    };

    fetchContract();
  }, []);

  const handleInputChange = (field: keyof CollectionDetails, value: string) => {
    setCollectionDetails((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <Center py={10}>
      <VStack spacing={4} width={["full", "md"]}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter collection name"
            value={collectionDetails.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Symbol</FormLabel>
          <Input
            placeholder="Enter collection symbol"
            value={collectionDetails.symbol}
            onChange={(e) => handleInputChange("symbol", e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Price (ETH)</FormLabel>
          <NumberInput
            step={0.0001}
            min={0}
            placeholder="Enter price in ETH"
            onChange={(valueString) => handleInputChange("price", valueString)}
          >
            <NumberInputField value={collectionDetails.price} />
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>URI</FormLabel>
          <Input
            placeholder="Enter URI for metadata (IPFS image only)"
            value={collectionDetails.uri}
            onChange={(e) => handleInputChange("uri", e.target.value)}
          />
        </FormControl>
        return (
        <Center py={10}>
          <VStack spacing={4} width={["full", "md"]}>
            <Button
              colorScheme="teal"
              onClick={handleCreateCollection}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Collection"}
            </Button>
          </VStack>
          <NotOwnerModal
            isOpen={showNotOwnerModal}
            onClose={() => setShowNotOwnerModal(false)}
            ownerAddress={ownerAddress}
          />
        </Center>
        );
      </VStack>
      <NotOwnerModal
        isOpen={showNotOwnerModal}
        onClose={() => setShowNotOwnerModal(false)}
        ownerAddress={ownerAddress}
      />
    </Center>
  );
}
