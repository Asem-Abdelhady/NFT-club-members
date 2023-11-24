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
  return (
    <HStack spacing={0}>
      <Box
        w="20%"
        h="50vh"
        bg="pink.100"
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
          />
        ))}
      </Box>

      <Divider orientation="vertical" bg="gray.300" height="80%" />

      <Box w="100%" h="50vh">
        <SelectedChat selectedId={selectedId} />
      </Box>
    </HStack>
  );
};
export default ChatsList;
