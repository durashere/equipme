import { Box } from '@chakra-ui/react';
import { ReactElement } from 'react';

import DefaultLayout from '@/layouts/DefaultLayout';

const DashboardPage = (): ReactElement => {
  return <Box>Dashboard</Box>;
};

DashboardPage.getLayout = (page: ReactElement): ReactElement => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default DashboardPage;
