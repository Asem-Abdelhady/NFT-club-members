"use client";
import React from "react";
import { HStack, Avatar, Text, Box } from "@chakra-ui/react";

const ChatClub: React.FC<{ name: string; imageUrl: string }> = ({
  name,
  imageUrl,
}) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      boxShadow="md"
      p={2}
    >
      <HStack align="center" spacing={2}>
        <Avatar src={imageUrl} />
        <Text fontSize="md">{name}</Text>
      </HStack>
    </Box>
  );
};

export default ChatClub;
