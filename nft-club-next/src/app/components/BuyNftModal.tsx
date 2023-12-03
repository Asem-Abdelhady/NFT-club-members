import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";

interface BuyNftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (username: string) => void;
}

const BuyNftModal: React.FC<BuyNftModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [username, setUsername] = useState("");

  const isUsernameValid = username.length >= 6;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buy NFT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            You need to own a specific NFT to enter this chat. Would you like to
            buy it?
          </Text>
          <Input
            placeholder="Enter Username (min 6 characters)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isRequired
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              onConfirm(username);
              setUsername("");
            }}
            isDisabled={!isUsernameValid}
          >
            Buy NFT
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BuyNftModal;
