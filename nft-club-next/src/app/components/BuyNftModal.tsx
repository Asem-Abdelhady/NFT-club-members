import React from "react";
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
} from "@chakra-ui/react";

interface BuyNftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BuyNftModal: React.FC<BuyNftModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buy NFT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            You need to own a specific NFT to enter this chat. Would you like to
            buy it?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onConfirm}>
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
