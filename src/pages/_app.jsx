import { GlobalStyles } from '@mui/material';
import DefaultLayout from '@/layout/DefaultLayout';

import '@fontsource/roboto';

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
