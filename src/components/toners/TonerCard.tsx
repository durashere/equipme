import { collection, DocumentData, orderBy, query } from 'firebase/firestore';
import { MdOutlineHistory } from 'react-icons/md';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';

import { db } from '@/lib/firebase/clientApp';
import TonerUseModal from '@/components/toners/TonerUseModal';

interface TonerCardProps {
  id: string;
  toner: DocumentData;
}

const TonerCard = ({ id, toner }: TonerCardProps): ReactElement => {
  const { isOpen, onToggle } = useDisclosure();

  const [tonersHistory] = useCollection(
    query(collection(db, `toners/${id}/history`), orderBy('date', 'desc'))
  );

  return (
    <Box borderWidth={1} borderRadius="md">
      <HStack p={4} spacing={4}>
        <Box flexGrow={1}>
          <Heading
            as="h2"
            textTransform="uppercase"
            fontSize="xl"
            color="blue.500"
          >
            {toner.brand} {toner.model}
          </Heading>
          <Text fontSize="md" textTransform="uppercase" color="gray.500">
            {toner.code}
          </Text>
        </Box>
        <IconButton
          aria-label="usage history"
          icon={<MdOutlineHistory />}
          onClick={onToggle}
        />
      </HStack>
      <HStack p={4} spacing={4}>
        <Text flexGrow={1} fontSize="lg">
          {toner.color}
        </Text>
        <HStack spacing={4}>
          <Text fontSize="lg">{toner.stock} in stock</Text>
          <TonerUseModal id={id} toner={toner} />
        </HStack>
      </HStack>
      {isOpen && (
        <Box maxH={200} overflow="auto" borderTopWidth={1}>
          <Table mt={2} size="sm">
            <Thead>
              <Tr>
                <Th>date</Th>
                <Th>user</Th>
                <Th isNumeric>stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tonersHistory?.docs.map((entry) => (
                <Tr key={entry.id}>
                  <Td>
                    {moment(entry.data().date?.toDate()).format(
                      'HH:mm, DD.MM.YYYY'
                    )}
                  </Td>
                  <Td>{entry.data().user}</Td>
                  <Td isNumeric>{entry.data().stock}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default TonerCard;
