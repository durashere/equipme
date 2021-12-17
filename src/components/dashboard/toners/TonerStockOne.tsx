import { collection, query, where } from 'firebase/firestore';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '@/lib/firebase/clientApp';
import TonerStock from '@/components/dashboard/toners/TonerStock';
import Widget from '@/components/dashboard/Widget';

const TonerStockOne = (): ReactElement | null => {
  const [toners, tonersLoading] = useCollection(
    query(collection(db, 'toners'), where('stock', '==', 1))
  );

  const textToCopy = toners?.docs
    .map((toner) => `${toner.data().code} - ${toner.data().stock + 1}`)
    .join('\n');

  if (tonersLoading || !toners?.docs.length) {
    return null;
  }

  return (
    <Widget title="last toner in stock" copy={textToCopy}>
      <TonerStock toners={toners} />
    </Widget>
  );
};

export default TonerStockOne;
