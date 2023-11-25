import {
  Grid,
  Box,
  Divider,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import SelectedChat from "./SelectedChat";
import ChatClub from "./ChatClub";
import Collection from "../../../../types/Collection";
import { useState } from "react";

interface Props {
  collections: Collection[];
}

const ChatsList = (props: Props) => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<Collection>(
    props.collections[0]
  );

  console.log("Collection: ", selectedCollection);

  return (
    <HStack spacing={0}>
      <Box
        w="20%"
        h="50vh"
        bg="teal.100"
        p={4}
        overflowY="auto"
        borderRadius="lg"
        boxShadow="lg"
        marginRight="20px"
      >
        {props.collections.map((chat) => (
          <ChatClub
            key={chat.id}
            collection={chat}
            setSelectedId={setSelectedId}
            setSelectedName={setSelectedName}
            setSelectedCollection={setSelectedCollection}
            isSelected={chat.id === selectedId}
          />
        ))}
      </Box>

      <Divider orientation="vertical" bg="gray.300" height="80%" />

      <Box w="100%" h="50vh">
        <SelectedChat
          selectedId={selectedId}
          selectedName={selectedName}
          selectecCollection={selectedCollection}
        />
      </Box>
    </HStack>
  );
};
export default ChatsList;
