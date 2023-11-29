import { HStack, Avatar, Text, Box } from "@chakra-ui/react";
import Collection from "../../../../types/Collection";
import { Dispatch, SetStateAction, useState } from "react";
import "./ChatClub.css";
interface Props {
  collection: Collection;
  isSelected: boolean; // Add this line
  setSelectedId: Dispatch<SetStateAction<number>>;
  setSelectedName: Dispatch<SetStateAction<string>>;
  setSelectedCollection: Dispatch<SetStateAction<Collection>>;
}

const ChatClub = ({ collection, isSelected }: Props) => {
  return (
    <div className={`chat-club `}>
      <Box
        border="1px solid"
        borderColor={`${isSelected ? "black" : "teal.300"}`}
        marginBottom="10px"
        borderRadius="lg"
        boxShadow="md"
        p={2}
        className={`${isSelected ? "selected" : ""}`}
      >
        <HStack align="center" spacing={2}>
          <Avatar src={collection.uri} />
          <Text fontSize="md">{collection.name}</Text>
        </HStack>
      </Box>
    </div>
  );
};

export default ChatClub;
