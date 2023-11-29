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

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
  onProceed,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Warning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            If you proceed, the current chat will be cleared. Are you sure you
            want to continue?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onProceed}>
            Yes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
