import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from "@chakra-ui/react";

interface ButNftErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ButNftErrorModal: React.FC<ButNftErrorModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>
          <Text>
            Error encountered. Please make sure you have enough funds to buy.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ButNftErrorModal;
