import { addDoc, collection } from 'firebase/firestore';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';

import { db } from '@/firebase/clientApp';
import EquipmentManageList from '@/components/EquipmentManageList';

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const StyledAddInput = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

const EquipmentManagePage = () => {
  const [name, setName] = useState('');

  const createEquipment = async (e) => {
    e.preventDefault();
    if (name.length < 1) return;
    setName('');
    await addDoc(collection(db, 'equipment'), { name, quantity: 10 });
  };

  const handleNameChange = (e) => setName(e.target.value);

  return (
    <StyledForm onSubmit={createEquipment}>
      <EquipmentManageList />
      <StyledAddInput>
        <TextField
          value={name}
          onChange={handleNameChange}
          fullWidth
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          add
        </Button>
      </StyledAddInput>
    </StyledForm>
  );
};

export default EquipmentManagePage;
