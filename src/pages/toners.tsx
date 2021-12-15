import { Alert, AlertIcon, Grid, Stack } from '@chakra-ui/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '@/lib/firebase/clientApp';
import DefaultLayout from '@/layouts/DefaultLayout';
import TonerAddModal from '@/components/toners/TonerAddModal';
import TonerCard from '@/components/toners/TonerCard';

const TonersPage = (): ReactElement | null => {
  const [toners, tonersLoading] = useCollection(
    query(collection(db, 'toners'), orderBy('brand'))
  );

  if (tonersLoading) {
    return null;
  }

  return (
    <Stack spacing={4}>
      <TonerAddModal toners={toners} />
      {toners?.docs.length !== 0 && (
        <Grid gap={4}>
          {toners?.docs.map((toner) => (
            <TonerCard key={toner.id} id={toner.id} toner={toner.data()} />
          ))}
        </Grid>
      )}
      {toners?.docs.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          There are no toners in the database.
        </Alert>
      )}
    </Stack>
  );
};

TonersPage.getLayout = (page: ReactElement): ReactElement => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default TonersPage;
