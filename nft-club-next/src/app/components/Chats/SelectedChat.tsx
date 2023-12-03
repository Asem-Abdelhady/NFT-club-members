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
import getUsername from "../../../../utils/getUsername";
import ButNftErrorModal from "../BuyNftErrorModal";

interface Props {
  selectedId: number;
  selectedName: string;
  selectedCollection: Collection;
  shouldReset: boolean;
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
  const [username, setUsername] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [previousRoomId, setPreviousRoomId] = useState<number>(-1);

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
    if (props.shouldReset) {
      setIsEntered(false);
      setMessages([]);
    }
  }, [props.shouldReset]);

  useEffect(() => {
    const fetchContract = async () => {
      const newContract = await getCotnract();
      const walletInfo = await connectWalletEthers();
      setContract(newContract!);
      setWalletInfo(walletInfo);
    };

    fetchContract();
  }, []);
  useEffect(() => {
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
    if (socket) {
      if (previousRoomId >= 0) {
        const previousRoom = `chat-${previousRoomId}`;
        socket.emit("leave room", previousRoom);
      }

      const newRoom = `chat-${props.selectedId}`;
      socket.emit("join room", newRoom);
      setPreviousRoomId(props.selectedId);
    }
  }, [props.selectedId, socket]);

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
    if (socket && message.trim() && username) {
      const userMessage = { text: message, userId: userId, username: username };
      socket.emit("chat message", userMessage, `chat-${props.selectedId}`);
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

    const userReceipt = await getUsername(props.selectedId);
    setUsername(userReceipt[1]);
    setIsEntered(true);
  };

  const handleCloseModal = () => {
    setShowBuyNftModal(false);
  };

  const handleConfirmPurchase = async (username: string) => {
    setIsConfirmingPurchase(true);
    setShowBuyNftModal(false);

    try {
      await buyNft(props.selectedId, username);
      const userReceipt = await getUsername(props.selectedId);
      setUsername(userReceipt[1]);
      setIsEntered(true);
    } catch (error) {
      console.error("Error confirming purchase:", error);
      setShowErrorModal(true);
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
          {props.selectedName ? props.selectedName : "No selected chat"}
        </Text>
        <Divider flex="1" />

        <Box w="100%" overflowY="auto" sx={hiddenScrollbarStyle}>
          {messages.map((msg, index) => (
            <Flex
              key={index}
              flexDirection="column"
              alignItems={msg.userId === userId ? "flex-end" : "flex-start"}
              w="100%"
            >
              <Text fontSize="sm" color="gray.500" mx={2} my={1}>
                {msg.username || "Anonymous"}
              </Text>
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
          <div ref={messagesEndRef} />
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
          bg="rgba(255, 255, 255, 0.7)"
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
      <ButNftErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
    </Box>
  );
};

export default SelectedChat;
