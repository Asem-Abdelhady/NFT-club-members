import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

interface NotOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerAddress: string;
}

const NotOwnerModal: React.FC<NotOwnerModalProps> = ({
  isOpen,
  onClose,
  ownerAddress,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Permission Denied</ModalHeader>
        <ModalBody>
          <Text>Only the owner ({ownerAddress}) can create collections.</Text>
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

export default NotOwnerModal;
