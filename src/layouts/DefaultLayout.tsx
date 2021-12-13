import { ReactElement } from 'react';

import { Box, Container } from '@chakra-ui/react';
import DefaultHeader from '@/layouts/DefaultHeader';

interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayout): ReactElement => (
  <Container py={4} minH="100vh">
    <DefaultHeader />
    <Box as="main">{children}</Box>
  </Container>
);

export default DefaultLayout;
