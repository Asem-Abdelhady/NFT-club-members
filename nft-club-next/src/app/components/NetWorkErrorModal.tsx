// NetworkErrorModal.tsx
import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface NetworkErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetworkErrorModal: React.FC<NetworkErrorModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Network Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Our service only exists on the Sepolia testnet, please switch network.
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NetworkErrorModal;
