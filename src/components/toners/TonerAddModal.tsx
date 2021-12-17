import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { ReactElement } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

import { auth, db } from '@/lib/firebase/clientApp';

interface TonerAddModalProps {
  toners?: QuerySnapshot<DocumentData>;
}

interface AddTonerProps {
  brand: string;
  code: string;
  color: string;
  model: string;
  stock: number;
}

const defaultValues = {
  brand: '',
  code: '',
  color: '',
  model: '',
  stock: 1,
};

const TonerAddModal = ({ toners }: TonerAddModalProps): ReactElement => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const code = watch('code');
  const codeAlreadyUsed = toners?.docs.find(
    (toner) => toner.data().code.toLowerCase() === code?.toLowerCase()
  );

  const addToner = async (values: AddTonerProps): Promise<void> => {
    const currentStock = Number(values.stock);

    if (codeAlreadyUsed) {
      const newStock = Number(codeAlreadyUsed.data().stock) + currentStock;

      await updateDoc(doc(db, 'toners', codeAlreadyUsed.id), {
        stock: newStock,
      });

      await addDoc(collection(db, `toners/${codeAlreadyUsed.id}/history`), {
        date: serverTimestamp(),
        stock: newStock,
        user: user?.displayName,
      });
    }

    if (!codeAlreadyUsed) {
      const addedToner = await addDoc(collection(db, 'toners'), {
        brand: values.brand,
        code: values.code,
        color: values.color,
        model: values.model,
        stock: currentStock,
      });

      await addDoc(collection(db, `toners/${addedToner.id}/history`), {
        date: serverTimestamp(),
        stock: currentStock,
        user: user?.displayName,
      });
    }

    onClose();
    reset(defaultValues);
  };

  return (
    <>
      <Button onClick={onOpen}>Manage stock</Button>

      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add toner</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(addToner)}>
            <ModalBody>
              <Stack spacing={4}>
                <FormControl isInvalid={errors?.code}>
                  <FormLabel>Code</FormLabel>
                  <Input
                    autoComplete="off"
                    type="text"
                    {...register('code', {
                      required: 'You have to provide code',
                    })}
                  />
                  <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
                  {code && !codeAlreadyUsed && (
                    <Box ml={-2} mt={2} maxH={200} overflowY="scroll">
                      <Stack p={2}>
                        {toners?.docs
                          .filter((toner) =>
                            toner
                              .data()
                              .code.toLowerCase()
                              .includes(code?.toLowerCase())
                          )
                          .map((toner) => (
                            <Button
                              key={toner.id}
                              onClick={(): void =>
                                setValue('code', toner.data().code)
                              }
                            >
                              {toner.data().code}
                            </Button>
                          ))}
                      </Stack>
                    </Box>
                  )}
                </FormControl>
                {code && !codeAlreadyUsed && (
                  <>
                    <FormControl isInvalid={errors.model}>
                      <FormLabel>Model</FormLabel>
                      <Input
                        type="text"
                        {...register('model', {
                          required: 'You have to provide model',
                        })}
                      />
                      <FormErrorMessage>
                        {errors?.model?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.brand}>
                      <FormLabel>Brand</FormLabel>
                      <Select
                        placeholder="Select brand"
                        {...register('brand', {
                          required: 'You have to provide brand',
                        })}
                      >
                        <option value="Xerox">Xerox</option>
                        <option value="HP">HP</option>
                      </Select>
                      <FormErrorMessage>
                        {errors?.brand?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.color}>
                      <FormLabel>Color</FormLabel>
                      <Select
                        placeholder="Select color"
                        {...register('color', {
                          required: 'You have to provide color',
                        })}
                      >
                        <option value="Black">Black</option>
                        <option value="Cyan">Cyan</option>
                        <option value="Magenta">Magenta</option>
                        <option value="Yellow">Yellow</option>
                      </Select>
                      <FormErrorMessage>
                        {errors?.color?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </>
                )}
                <FormControl isInvalid={errors.stock}>
                  <FormLabel>
                    {codeAlreadyUsed
                      ? 'Quantity to be added'
                      : 'Initial quantity'}
                  </FormLabel>
                  <NumberInput defaultValue={1} min={1}>
                    <NumberInputField
                      type="number"
                      {...register('stock', {
                        required: 'You have to provide stock',
                      })}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>{errors?.stock?.message}</FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              {code && (
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="blue"
                  mr={4}
                >
                  {codeAlreadyUsed ? 'Update' : 'Add'}
                </Button>
              )}
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TonerAddModal;
