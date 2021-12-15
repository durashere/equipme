import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { MdMenu } from 'react-icons/md';
import { ReactElement } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { auth } from '@/lib/firebase/clientApp';

const menuItems = [{ name: 'Equipment', path: '/' }];

const DefaultHeader = (): ReactElement | null => {
  const { pathname, push } = useRouter();
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const activePage = menuItems.find((item) => item.path === pathname);

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Flex as="header" align="center" gap={4} mb={4}>
      <IconButton aria-label="open drawer" icon={<MdMenu />} onClick={onOpen} />
      <Heading as="h1" fontSize="xl" fontWeight="semibold" flexGrow={1}>
        {activePage?.name}
      </Heading>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Hello, {user ? user.displayName : 'Stranger'}
          </DrawerHeader>
          <DrawerBody>
            {user ? (
              <Button
                colorScheme="blue"
                isFullWidth
                onClick={(): Promise<void> => signOut(auth)}
              >
                Logout
              </Button>
            ) : (
              <Button colorScheme="blue" isFullWidth onClick={signInWithGoogle}>
                Login with Google
              </Button>
            )}
            <VStack mt={8} as="nav">
              {menuItems.map((item) => (
                <Button
                  isFullWidth
                  key={item.name}
                  onClick={(): void => {
                    push(item.path);
                    onClose();
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default DefaultHeader;
