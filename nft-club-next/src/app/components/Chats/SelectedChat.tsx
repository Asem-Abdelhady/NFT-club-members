"use client";
import React from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa"; // Import the send icon

const SelectedChat: React.FC = () => {
  const bgColor = useColorModeValue("pink.100", "pink.700");

  return (
    <Box
      bg={bgColor}
      p={4}
      h="100%"
      border="1px solid"
      borderColor="pink.200"
      borderRadius="lg"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      w="70%" // Adjust the width as needed
    >
      <VStack
        align="start"
        spacing={4}
        h="100%"
        py={4}
        px={8}
        flex="1"
        borderColor="pink.300"
      >
        {/* Chat Header */}
        <Text fontSize="xl" fontWeight="bold">
          Selected Chat
        </Text>
        <Divider flex="1" />

        {/* Chat Messages */}
        {/* You can map through messages and display them here */}
      </VStack>

      {/* Input Field and Send Button */}
      <Box>
        <InputGroup>
          <Input
            placeholder="Type your message"
            size="md"
            borderColor="pink.300"
          />
          <InputRightElement marginLeft="2">
            {/* Wrap IconButton in a Box and add margin */}
            <IconButton
              colorScheme="pink"
              aria-label="Send"
              icon={<FaPaperPlane />} // Send icon
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default SelectedChat;
