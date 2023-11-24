import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  Divider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { ethers } from "ethers";
import getCotnract from "../../../../utils/getCotnract";
import connectWalletEthers from "../../../../utils/connectWallet";
import WalletInfo from "../../../../types/WalletInfo";
import BuyNftModal from "../BuyNftModal";
import buyNft from "../../../../utils/buyNft";

interface Props {
  selectedId: number;
}

const SelectedChat = (props: Props) => {
  const bgColor = useColorModeValue("teal.100", "teal.700");
  const [isEntered, setIsEntered] = useState(false);
  const [message, setMessage] = useState("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [showBuyNftModal, setShowBuyNftModal] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = `You: ${message}`;
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleEnterChat = async () => {
    if (contract) {
      const receipt = await contract.verifyOwnership(
        props.selectedId,
        await walletInfo?.provider?.getSigner()
      );

      if (!receipt) {
        setShowBuyNftModal(true);
      } else {
        setIsEntered(true);
      }
    }
  };

  const handleBuyNft = async () => {
    const receipt = await buyNft(props.selectedId);
    setShowBuyNftModal(false);
  };

  useEffect(() => {
    const fetchContract = async () => {
      const newContract = await getCotnract();
      const walletInfo = await connectWalletEthers();
      setContract(newContract);
      setWalletInfo(walletInfo);
    };

    fetchContract();
  }, []);

  return (
    <Box
      bg={bgColor}
      p={4}
      h="100%"
      border="1px solid"
      borderColor="teal.200"
      borderRadius="lg"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      w="70%"
      position="relative"
    >
      {!isEntered && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="overlay"
        >
          <Button colorScheme="teal" onClick={handleEnterChat}>
            Enter Chat
          </Button>
        </Box>
      )}

      <VStack
        align="start"
        spacing={4}
        h="100%"
        py={4}
        px={8}
        flex="1"
        borderColor="teal.300"
        filter={!isEntered ? "blur(4px)" : "none"}
      >
        <Text fontSize="xl" fontWeight="bold">
          Selected Chat
        </Text>
        <Divider flex="1" />

        {/* Display messages */}
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </VStack>

      <Box filter={!isEntered ? "blur(4px)" : "none"}>
        <InputGroup>
          <Input
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message"
            size="md"
            borderColor="teal.300"
          />
          <InputRightElement marginLeft="2">
            <IconButton
              onClick={handleSendMessage}
              colorScheme="teal"
              aria-label="Send message"
              icon={<FaPaperPlane />}
            />
          </InputRightElement>
        </InputGroup>
      </Box>

      <BuyNftModal
        isOpen={showBuyNftModal}
        onClose={() => setShowBuyNftModal(false)}
        onConfirm={handleBuyNft}
      />
    </Box>
  );
};

export default SelectedChat;
