import { addDoc, collection } from 'firebase/firestore';
import { MdOutlineContentCopy, MdOutlineCreate } from 'react-icons/md';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import {
  IconButton,
  FormControl,
  Input,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';

import { db } from '@/lib/firebase/clientApp';
import DefaultLayout from '@/layouts/DefaultLayout';
import EquipmentItem from '@/components/EquipmentItem';

const EquipmentOrderPage = (): ReactElement | null => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [equipment, equipmentLoading] = useCollection(
    collection(db, 'equipment')
  );

  if (equipmentLoading) {
    return null;
  }

  if (!equipment) {
    return null;
  }

  const copyList = (): void => {
    const list = equipment.docs.map(
      (doc) => `${doc.data().name} - ${doc.data().quantity}`
    );
    const parsedList = list.join('\n');

    navigator.clipboard.writeText(parsedList);
  };

  const createEquipment = async (values: { name: string }): Promise<void> => {
    await addDoc(collection(db, 'equipment'), {
      name: values.name,
      quantity: 10,
    });
  };

  return (
    <Flex direction="column" gap={4}>
      <Flex direction="column" gap={4}>
        {equipment.docs.map((eq) => (
          <EquipmentItem key={eq.id} id={eq.id} item={eq.data()} />
        ))}
      </Flex>
      <form onSubmit={handleSubmit(createEquipment)}>
        <FormControl isInvalid={errors.name}>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <Flex gap={4}>
            <Input
              type="text"
              placeholder="Equipment name..."
              {...register('name', {
                required: 'You have to provide name',
                minLength: {
                  value: 4,
                  message: 'Minimum length must be at least 4',
                },
              })}
            />
            <IconButton
              icon={<MdOutlineCreate />}
              aria-label="create equipment"
              type="submit"
            />
          </Flex>
        </FormControl>
      </form>
      <IconButton
        aria-label="copy to clipboard"
        bottom="4"
        icon={<MdOutlineContentCopy />}
        onClick={copyList}
        position="fixed"
        right="4"
      />
    </Flex>
  );
};

EquipmentOrderPage.getLayout = (page: ReactElement): ReactElement => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default EquipmentOrderPage;
