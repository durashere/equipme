import { collection } from 'firebase/firestore';
import { Fab } from '@mui/material';
import { useCollection } from 'react-firebase-hooks/firestore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import EquipmentOrderList from '@/components/EquipmentOrderList';
import { db } from '@/firebase/clientApp';

const EquipmentOrderPage = () => {
  const [equipment, equipmentLoading, equipmentError] = useCollection(
    collection(db, 'equipment')
  );

  const copyList = async () => {
    let test = '';
    equipment.docs.forEach((doc) => {
      if (doc.data().quantity !== 0) {
        test += `${doc.data().name} - ${doc.data().quantity}x\n`;
      }
    });
    navigator.clipboard.writeText(test);
  };

  return (
    <div>
      <EquipmentOrderList />
      <Fab
        sx={(theme) => ({
          position: 'fixed',
          bottom: theme.spacing(4),
          right: theme.spacing(4),
        })}
        onClick={copyList}
        color="primary"
        aria-label="add"
      >
        <ContentCopyIcon />
      </Fab>
    </div>
  );
};

export default EquipmentOrderPage;
