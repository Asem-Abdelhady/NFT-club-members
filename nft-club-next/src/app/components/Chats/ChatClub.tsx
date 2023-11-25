"use client";
import { HStack, Avatar, Text, Box } from "@chakra-ui/react";
import Collection from "../../../../types/Collection";
import { Dispatch, SetStateAction } from "react";
import "./ChatClub.css"; // Import your CSS file

interface Props {
  collection: Collection;
  setSelectedId: Dispatch<SetStateAction<number>>;
  setSelectedName: Dispatch<SetStateAction<string>>;
  setSelectedCollection: Dispatch<SetStateAction<Collection>>;
}
const ChatClub = (props: Props) => {
  const handleClick = () => {
    props.setSelectedId(props.collection.id);
    props.setSelectedName(props.collection.name);
    props.setSelectedCollection(props.collection);
  };

  return (
    <div onClick={handleClick} className="chat-club">
      <Box
        border="1px solid"
        borderColor="teal.300"
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
    </div>
  );
};

export default ChatClub;
