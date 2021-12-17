import { collection, query, where } from 'firebase/firestore';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '@/lib/firebase/clientApp';
import TonerStock from '@/components/dashboard/toners/TonerStock';
import Widget from '@/components/dashboard/Widget';

const TonerStockZero = (): ReactElement | null => {
  const [toners, tonersLoading] = useCollection(
    query(collection(db, 'toners'), where('stock', '<=', 0))
  );

  const textToCopy = toners?.docs
    .map((toner) => `${toner.data().code} - ${toner.data().stock + 2}`)
    .join('\n');

  if (tonersLoading || !toners?.docs.length) {
    return null;
  }

  return (
    <Widget title="no toners in stock" copy={textToCopy}>
      <TonerStock toners={toners} />
    </Widget>
  );
};

export default TonerStockZero;
