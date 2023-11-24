import React from "react";
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Button,
  Text,
} from "@chakra-ui/react";
import ConnectButton from "./ConnectWallet";

const Header: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box bg={bgColor} boxShadow="md" py={2} px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        <Heading size="md" color={textColor}>
          NftClub 👑
        </Heading>
        <Flex alignItems="center">
          <ConnectButton />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
