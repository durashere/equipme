import { Box } from '@mui/system';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems = [
  { name: 'Order', path: '/', icon: <ListIcon /> },
  { name: 'Manage', path: '/manage', icon: <SettingsIcon /> },
];

const MenuItem = ({ item }) => {
  const { push } = useRouter();

  return (
    <ListItem
      sx={(theme) => ({
        paddingRight: theme.spacing(4),
      })}
      button
      onClick={() => push(item.path)}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

const DefaultHeader = () => {
  const { pathname } = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((state) => !state);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={toggleMenu}
          size="large"
          edge="start"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={(theme) => ({
            flexGrow: 1,
            paddingLeft: theme.spacing(2),
          })}
        >
          {menuItems.find((item) => item.path === pathname).name}
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
      <Drawer open={menuOpen} onClose={toggleMenu}>
        <Box onClick={toggleMenu} onKeyDown={toggleMenu}>
          <List>
            {menuItems.map((item) => (
              <MenuItem key={item.name} item={item} />
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default DefaultHeader;
