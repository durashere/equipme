import { Alert, AlertIcon, Box, Container } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/firebase/clientApp';
import DefaultHeader from '@/layouts/DefaultHeader';

interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayout): ReactElement | null => {
  const [user, loading] = useAuthState(auth);

  return (
    <Container py={4} minH="100vh">
      <DefaultHeader />
      <Box as="main">
        {!loading && user && children}
        {!loading && !user && (
          <Alert borderRadius="md" status="error">
            <AlertIcon />
            Login inside sidebar to get access.
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default DefaultLayout;
