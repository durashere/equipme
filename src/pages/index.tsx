import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import DefaultLayout from '@/layouts/DefaultLayout';
import TonerStockOne from '@/components/dashboard/toners/TonerStockOne';
import TonerStockZero from '@/components/dashboard/toners/TonerStockZero';

const DashboardPage = (): ReactElement => {
  return (
    <Stack spacing={4}>
      <TonerStockOne />
      <TonerStockZero />
    </Stack>
  );
};

DashboardPage.getLayout = (page: ReactElement): ReactElement => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default DashboardPage;
