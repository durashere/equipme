import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { updateDoc, collection, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '@/firebase/clientApp';

const StyledList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledListItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

const StyledQuantityInput = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const EquipmentOrderListItem = ({ item }) => {
  const { name, quantity } = item.data();

  const grayIfZero = () =>
    quantity <= 0 && {
      color: '#0000008A',
    };

  const updateEquipmentQuantity = async (quantityChange) => {
    const changedQuantity = quantity + quantityChange;

    if (changedQuantity < 0) {
      return;
    }

    await updateDoc(doc(db, 'equipment', item.id), {
      quantity: changedQuantity,
    });
  };

  const decreaseQuantityByFive = async () => {
    await updateEquipmentQuantity(-5);
  };

  const increaseQuantityByFive = async () => {
    await updateEquipmentQuantity(5);
  };

  return (
    <StyledListItem>
      <Typography variant="h5" sx={grayIfZero}>
        {name}
      </Typography>
      <StyledQuantityInput>
        <IconButton onClick={decreaseQuantityByFive}>
          <Typography width={24}>-5</Typography>
        </IconButton>
        <Typography variant="h5" textAlign="center" width={40} sx={grayIfZero}>
          {quantity}
        </Typography>
        <IconButton onClick={increaseQuantityByFive}>
          <Typography width={24}>+5</Typography>
        </IconButton>
      </StyledQuantityInput>
    </StyledListItem>
  );
};

const EquipmentOrderList = () => {
  const [equipment, equipmentLoading, equipmentError] = useCollection(
    collection(db, 'equipment')
  );

  if (equipmentLoading) {
    return <></>;
  }

  return (
    <StyledList>
      {equipment.docs.map((item) => (
        <EquipmentOrderListItem key={item.id} item={item} />
      ))}
    </StyledList>
  );
};

export default EquipmentOrderList;
