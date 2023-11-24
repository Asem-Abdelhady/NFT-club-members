"use client";
import { HStack, Avatar, Text, Box } from "@chakra-ui/react";
import Collection from "../../../../types/Collection";
import { Dispatch, SetStateAction } from "react";

interface Props {
  collection: Collection;
  setSelectedId: Dispatch<SetStateAction<number>>;
}
const ChatClub = (props: Props) => {
  const handleClick = () => {
    props.setSelectedId(props.collection.id);
  };
  return (
    <Box
      border="1px solid"
      borderColor="pink.300"
      marginBottom="10px"
      borderRadius="lg"
      boxShadow="md"
      p={2}
      onClick={handleClick}
    >
      <HStack align="center" spacing={2}>
        <Avatar src={props.collection.uri} />
        <Text fontSize="md">{props.collection.name}</Text>
      </HStack>
    </Box>
  );
};

export default ChatClub;
