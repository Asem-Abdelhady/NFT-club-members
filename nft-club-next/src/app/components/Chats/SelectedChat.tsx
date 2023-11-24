import { useState } from "react";
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

interface Props {
  selectedId: number;
}

const SelectedChat = (props: Props) => {
  const bgColor = useColorModeValue("pink.100", "pink.700");
  const [isEntered, setIsEntered] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleEnterChat = () => {
    setIsEntered(true);
  };

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
          <Button colorScheme="pink" onClick={handleEnterChat}>
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
        borderColor="pink.300"
        filter={!isEntered ? "blur(4px)" : "none"}
      >
        <Text fontSize="xl" fontWeight="bold">
          Selected Chat
        </Text>
        <Divider flex="1" />
      </VStack>

      <Box filter={!isEntered ? "blur(4px)" : "none"}>
        <InputGroup>
          <Input
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message"
            size="md"
            borderColor="pink.300"
          />
          <InputRightElement marginLeft="2">
            <IconButton
              onClick={handleSendMessage}
              colorScheme="pink"
              aria-label="Send message"
              icon={<FaPaperPlane />}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default SelectedChat;
