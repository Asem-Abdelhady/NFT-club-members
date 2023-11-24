"use client";
import { HStack, Avatar, Text, Box } from "@chakra-ui/react";
import Collection from "../../../../types/Collection";

interface Props {
  collection: Collection;
}
const ChatClub = (props: Props) => {
  return (
    <Box
      border="1px solid"
      borderColor="pink.300"
      marginBottom="10px"
      borderRadius="lg"
      boxShadow="md"
      p={2}
    >
      <HStack align="center" spacing={2}>
        <Avatar src={props.collection.uri} />
        <Text fontSize="md">{props.collection.name}</Text>
      </HStack>
    </Box>
  );
};

export default ChatClub;
