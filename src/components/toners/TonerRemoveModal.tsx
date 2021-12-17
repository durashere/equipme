import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '@/lib/firebase/clientApp';

interface TonerRemoveModalProps {
  id: string;
  code: string;
}

const TonerRemoveModal = ({
  id,
  code,
}: TonerRemoveModalProps): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const removeToner = async (): Promise<void> => {
    setIsSubmitting(true);
    await deleteDoc(doc(db, 'toners', id));
  };

  return (
    <>
      <IconButton
        aria-label="remove toner"
        colorScheme="red"
        icon={<MdOutlineDelete />}
        onClick={onOpen}
      />

      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add toner</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>
              Are you sure you want to remove toner with code
              <Text fontWeight="bold" as="span">
                {` ${code} `}
              </Text>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              colorScheme="red"
              onClick={removeToner}
              mr={4}
            >
              Remove
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TonerRemoveModal;
