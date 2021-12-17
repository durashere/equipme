import { Box, Heading, IconButton, useClipboard } from '@chakra-ui/react';
import { MdOutlineCheck, MdOutlineContentCopy } from 'react-icons/md';
import { ReactElement } from 'react';

interface WidgetProps {
  title: string;
  children: ReactElement;
  copy?: string;
}

const Widget = ({ title, children, copy }: WidgetProps): ReactElement => {
  const { hasCopied, onCopy } = useClipboard(copy || '');

  return (
    <Box borderWidth={1} borderRadius="md">
      <Box borderBottomWidth={1} px={4} py={2}>
        <Heading
          as="h2"
          textTransform="uppercase"
          fontSize="md"
          color="blue.500"
        >
          {title}
        </Heading>
      </Box>
      <Box display={copy && 'flex'} p={4}>
        <Box flexGrow={copy && 1}>{children}</Box>
        {copy && (
          <IconButton
            alignSelf="end"
            aria-label={`copy ${title} to clipboard`}
            icon={hasCopied ? <MdOutlineCheck /> : <MdOutlineContentCopy />}
            onClick={onCopy}
          />
        )}
      </Box>
    </Box>
  );
};

export default Widget;
