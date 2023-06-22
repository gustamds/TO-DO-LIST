import React from "react";
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export function TaskModal({
  isOpen,
  onClose,
  onConfirmDelete,
}: TaskModalProps) {
  return (
    <Modal isCentered isOpen={isOpen} size={"sm"} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent background="#262626">
        <ModalHeader color="white">Are you sure about that?</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Text color="white">
            Are you sure you want to delete your task without completing it?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" color="white" onClick={onConfirmDelete}>
            Delete Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
