import { deleteDoc, collection, doc } from 'firebase/firestore';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useCollection } from 'react-firebase-hooks/firestore';
import DeleteIcon from '@mui/icons-material/Delete';

import { db } from '@/firebase/clientApp';

const StyledList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const StyledListItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  gap: theme.spacing(1),
}));

const EquipmentManageListItem = ({ item }) => {
  const { name } = item.data();

  const removeItem = async () => {
    await deleteDoc(doc(db, 'equipment', item.id));
  };

  return (
    <StyledListItem>
      <Typography variant="h5" flexGrow={1}>
        {name}
      </Typography>
      <IconButton onClick={removeItem}>
        <DeleteIcon />
      </IconButton>
    </StyledListItem>
  );
};

const EquipmentManageList = () => {
  const [equipment, equipmentLoading] = useCollection(
    collection(db, 'equipment')
  );

  if (equipmentLoading) {
    return <></>;
  }

  return (
    <StyledList>
      {equipment.docs.map((item) => (
        <EquipmentManageListItem key={item.id} item={item} />
      ))}
    </StyledList>
  );
};

export default EquipmentManageList;
