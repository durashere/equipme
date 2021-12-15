import { ReactElement, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  Button,
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

import { auth, db } from '@/lib/firebase/clientApp';

interface TonerUseProps {
  id: string;
  toner: DocumentData;
}

const TonerUseModal = ({ id, toner }: TonerUseProps): ReactElement => {
  const [user] = useAuthState(auth);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const zeroInStock = toner.stock === 0;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const useToner = async (): Promise<void> => {
    if (!zeroInStock) {
      setIsSubmitting(true);
      const newStock = toner.stock - 1;

      await updateDoc(doc(db, 'toners', id), {
        stock: newStock,
      });

      await addDoc(collection(db, `toners/${id}/history`), {
        date: serverTimestamp(),
        stock: newStock,
        user: user?.displayName,
      });

      onClose();
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        isDisabled={zeroInStock}
        minW={100}
        onClick={onOpen}
        colorScheme="blue"
      >
        Use
      </Button>

      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Use toner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to remove
              <Text fontWeight="bold" as="span">
                {` ${toner.code} `}
              </Text>
              from stock?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              onClick={useToner}
              colorScheme="blue"
              mr={4}
            >
              Use
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TonerUseModal;
