import { Container } from '@mui/material';
import { styled } from '@mui/system';
import DefaultHeader from './DefaultHeader';

const StyledLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const DefaultLayout = ({ children }) => (
  <StyledLayout>
    <DefaultHeader />
    <Container maxWidth="md">{children}</Container>
  </StyledLayout>
);

export default DefaultLayout;
