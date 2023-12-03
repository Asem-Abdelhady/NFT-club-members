import { Box, Divider, HStack } from "@chakra-ui/react";
import SelectedChat from "./SelectedChat";
import ChatClub from "./ChatClub";
import Collection from "../../../../types/Collection";
import { useEffect, useState } from "react";
import WarningModal from "../ChatWarningModal";

interface Props {
  collections: Collection[];
}

const ChatsList: React.FC<Props> = (props) => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedName, setSelectedName] = useState<string>("Monkeys");
  const [selectedCollection, setSelectedCollection] = useState<Collection>(
    props.collections[0]
  );
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [nextChat, setNextChat] = useState<Collection | null>(null);
  const [shouldReset, setShouldReset] = useState(false);

  const handleChatSelect = (chat: Collection) => {
    if (selectedId !== chat.id) {
      setNextChat(chat);
      setShowWarningModal(true);
    }
  };

  const proceedToNextChat = () => {
    if (nextChat) {
      setSelectedId(nextChat.id);
      setSelectedName(nextChat.name);
      setSelectedCollection(nextChat);
      setShouldReset(true);
    }
    setShowWarningModal(false);
  };

  useEffect(() => {
    if (shouldReset) {
      setShouldReset(false);
    }
  }, [shouldReset]);

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
        border="1px solid"
        borderColor="teal.200"
      >
        {props.collections.map((chat) => (
          <div key={chat.id} onClick={() => handleChatSelect(chat)}>
            <ChatClub
              collection={chat}
              setSelectedId={setSelectedId}
              setSelectedName={setSelectedName}
              setSelectedCollection={setSelectedCollection}
              isSelected={chat.id === selectedId}
            />
          </div>
        ))}
      </Box>

      <Divider orientation="vertical" bg="gray.300" height="80%" />

      <Box w="100%" h="50vh">
        <SelectedChat
          selectedId={selectedId}
          selectedName={selectedName}
          selectedCollection={selectedCollection}
          shouldReset={shouldReset}
        />
      </Box>

      <WarningModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        onProceed={proceedToNextChat}
      />
    </HStack>
  );
};

export default ChatsList;
