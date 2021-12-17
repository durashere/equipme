import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { List, ListItem } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface TonerStockProps {
  toners: QuerySnapshot<DocumentData>;
}

const TonerStock = ({ toners }: TonerStockProps): ReactElement => {
  return (
    <List>
      {toners?.docs.map((toner) => (
        <ListItem key={toner.id} id={toner.id}>
          {toner.data().code}
        </ListItem>
      ))}
    </List>
  );
};

export default TonerStock;
