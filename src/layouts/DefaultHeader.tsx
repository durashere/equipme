import { MdMenu } from 'react-icons/md';
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
import { ReactElement } from 'react';

const menuItems = [{ name: 'Equipment', path: '/' }];

const DefaultHeader = (): ReactElement => {
  const { pathname, push } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const activePage = menuItems.find((item) => item.path === pathname);

  return (
    <Flex as="header" align="center" gap={4} mb={4}>
      <IconButton aria-label="open drawer" icon={<MdMenu />} onClick={onOpen} />
      <Heading as="h1" fontSize="3xl" fontWeight="bold" flexGrow={1}>
        {activePage?.name}
      </Heading>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <VStack as="nav">
              {menuItems.map((item) => (
                <Button
                  isFullWidth
                  item={item}
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
