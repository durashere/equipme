import { deleteDoc, doc, DocumentData, updateDoc } from 'firebase/firestore';
import { IconButton, Heading, Text, Flex } from '@chakra-ui/react';
import { MdOutlineAdd, MdOutlineDelete, MdOutlineRemove } from 'react-icons/md';
import { ReactElement } from 'react';

import { db } from '@/lib/firebase/clientApp';

interface EquipmentItemProps {
  id: string;
  item: DocumentData;
}

const EquipmentItem = ({
  id,
  item: { name, quantity },
}: EquipmentItemProps): ReactElement => {
  const grayIfZero = quantity <= 0 ? 'gray.400' : 'current';

  const removeEquipment = async (): Promise<void> => {
    await deleteDoc(doc(db, 'equipment', id));
  };

  const updateEquipmentQuantity = async (
    quantityChange: number
  ): Promise<void> => {
    const changedQuantity = quantity + quantityChange;

    if (changedQuantity < 0) {
      return;
    }

    await updateDoc(doc(db, 'equipment', id), {
      quantity: changedQuantity,
    });
  };

  const decreaseQuantityByFive = async (): Promise<void> => {
    await updateEquipmentQuantity(-5);
  };

  const increaseQuantityByFive = async (): Promise<void> => {
    await updateEquipmentQuantity(5);
  };

  return (
    <Flex gap={4} align="center" justify="space-between">
      <IconButton
        aria-label="remove item"
        onClick={removeEquipment}
        icon={<MdOutlineDelete />}
      />
      <Heading flexGrow={1} as="h2" fontSize="sm" color={grayIfZero}>
        {name}
      </Heading>
      <Flex gap={4} align="center" justify="center">
        <IconButton
          aria-label="remove five"
          onClick={decreaseQuantityByFive}
          icon={<MdOutlineRemove />}
        />
        <Text fontSize="2xl" align="center" width="16" color={grayIfZero}>
          {quantity}
        </Text>
        <IconButton
          aria-label="add five"
          onClick={increaseQuantityByFive}
          icon={<MdOutlineAdd />}
        />
      </Flex>
    </Flex>
  );
};

export default EquipmentItem;
