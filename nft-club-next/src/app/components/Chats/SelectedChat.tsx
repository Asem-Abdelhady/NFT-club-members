import React, { useState, useEffect, useRef } from "react";
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
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import getCotnract from "../../../../utils/getCotnract";
import connectWalletEthers from "../../../../utils/connectWallet";
import WalletInfo from "../../../../types/WalletInfo";
import { ethers } from "ethers";
import BuyNftModal from "../BuyNftModal";
import buyNft from "../../../../utils/buyNft";
import Collection from "../../../../types/Collection";

interface Props {
  selectedId: number;
  selectedName: string;
  selectecCollection: Collection;
}

const SelectedChat = (props: Props) => {
  const bgColor = useColorModeValue("teal.100", "teal.700");
  const [isEntered, setIsEntered] = useState(false);
  const [message, setMessage] = useState("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showBuyNftModal, setShowBuyNftModal] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const messagesEndRef = useRef<any>(null);
  const [isConfirmingPurchase, setIsConfirmingPurchase] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const hiddenScrollbarStyle = {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  };

  useEffect(() => {
    const fetchContract = async () => {
      const newContract = await getCotnract();
      const walletInfo = await connectWalletEthers();
      setContract(newContract!);
      setWalletInfo(walletInfo);
    };

    fetchContract();

    const newSocket = io("https://nft-club-socket-io.onrender.com/");
    setSocket(newSocket);

    newSocket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const uniqueId = "user-" + Math.random().toString(36).substr(2, 9);
    setUserId(uniqueId);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      const userMessage = { text: message, userId: userId };
      socket.emit("chat message", userMessage);
      setMessage("");
    }
  };

  const handleEnterChat = async () => {
    if (!contract) return;

    const receipt = await contract.verifyOwnership(
      props.selectedId,
      await walletInfo?.provider?.getSigner()
    );

    if (!receipt) {
      setShowBuyNftModal(true);
      return;
    }

    setIsEntered(true);
  };

  const handleCloseModal = () => {
    setShowBuyNftModal(false);
  };

  const handleConfirmPurchase = async () => {
    setIsConfirmingPurchase(true);
    setShowBuyNftModal(false);

    try {
      await buyNft(props.selectedId);
      setIsEntered(true);
    } catch (error) {
      console.error("Error confirming purchase:", error);
    } finally {
      setIsConfirmingPurchase(false);
    }
  };
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
        h="calc(100% - 60px)"
        py={4}
        px={8}
        flex="1"
        borderColor="teal.300"
        overflowY="auto"
        sx={hiddenScrollbarStyle}
        filter={!isEntered ? "blur(4px)" : "none"}
      >
        <Text fontSize="xl" fontWeight="bold">
          {props.selectecCollection
            ? props.selectecCollection.name
            : "No selected chat"}
        </Text>
        <Divider flex="1" />

        <Box w="100%" overflowY="auto" sx={hiddenScrollbarStyle}>
          {messages.map((msg, index) => (
            <Flex
              key={index}
              justifyContent={msg.userId === userId ? "flex-start" : "flex-end"}
              w="100%"
            >
              <Text
                bg={msg.userId === userId ? "blue.100" : "gray.100"}
                borderRadius="md"
                p={2}
                m={2}
              >
                {msg.text}
              </Text>
            </Flex>
          ))}
          <div ref={messagesEndRef} />{" "}
        </Box>
      </VStack>

      <Box>
        <InputGroup>
          <Input
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
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
      {isConfirmingPurchase && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          alignItems="center"
          justifyContent="center"
          bg="rgba(255, 255, 255, 0.7)" // Semi-transparent white background
          zIndex="overlay"
        >
          <Spinner size="xl" color="teal.500" />
        </Flex>
      )}
      <BuyNftModal
        isOpen={showBuyNftModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmPurchase}
      />
    </Box>
  );
};

export default SelectedChat;
