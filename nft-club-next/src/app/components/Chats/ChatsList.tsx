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

interface Props {
  collections: Collection[];
}
const chatClubData = [
  { id: 1, name: "Alice", imageUrl: "https://via.placeholder.com/50" },
  { id: 2, name: "Bob", imageUrl: "https://via.placeholder.com/50" },
];
const ChatsList = (props: Props) => {
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
          <ChatClub key={chat.id} collection={chat} />
        ))}
      </Box>

      <Divider orientation="vertical" bg="gray.300" height="80%" />

      <Box w="100%" h="50vh">
        <SelectedChat />
      </Box>
    </HStack>
  );
};
export default ChatsList;
