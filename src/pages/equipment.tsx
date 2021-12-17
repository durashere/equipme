import { addDoc, collection } from 'firebase/firestore';
import { MdOutlineContentCopy, MdOutlineCreate } from 'react-icons/md';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/react';

import { db } from '@/lib/firebase/clientApp';
import DefaultLayout from '@/layouts/DefaultLayout';
import EquipmentItem from '@/components/equipment/EquipmentCard';

const EquipmentPage = (): ReactElement | null => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [equipment, equipmentLoading] = useCollection(
    collection(db, 'equipment')
  );

  if (equipmentLoading) {
    return null;
  }

  const copyList = (): void => {
    if (equipment) {
      const list = equipment.docs.map(
        (doc) => `${doc.data().name} - ${doc.data().quantity}`
      );
      const parsedList = list.join('\n');

      navigator.clipboard.writeText(parsedList);
    }
  };

  const createEquipment = async (values: { name: string }): Promise<void> => {
    await addDoc(collection(db, 'equipment'), {
      name: values.name,
      quantity: 10,
    });

    reset({ name: '' });
  };

  return (
    <Stack spacing={4}>
      {equipment?.docs.length !== 0 && (
        <Stack spacing={4}>
          {equipment?.docs.map((eq) => (
            <EquipmentItem key={eq.id} id={eq.id} item={eq.data()} />
          ))}
        </Stack>
      )}
      {equipment?.docs.length === 0 && (
        <Alert borderRadius="md" status="info">
          <AlertIcon />
          There are no equipment in the database.
        </Alert>
      )}
      <form onSubmit={handleSubmit(createEquipment)}>
        <FormControl isInvalid={errors.name}>
          <HStack spacing={4}>
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
              isLoading={isSubmitting}
              icon={<MdOutlineCreate />}
              aria-label="create equipment"
              type="submit"
            />
          </HStack>
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
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
    </Stack>
  );
};

EquipmentPage.getLayout = (page: ReactElement): ReactElement => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default EquipmentPage;
