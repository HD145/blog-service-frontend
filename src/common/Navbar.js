import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import axios from 'axios';
import endpoint from './config/endpoints';
import { axiosPoint } from './config/axios';
import { useLoader } from './wrappers/MuiLoader';

const routes = [
  { text: 'Explore', to: '/explore' },
  { text: 'Blogs', to: '/blogs' },
  { text: 'Profile', to: `/profile/${JSON.parse(localStorage.getItem("userDetails"))?.username}` },
  { text: 'Contact', to: '/contact' }
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { showLoader, hideLoader } = useLoader();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    showLoader();
    try {
      await axios.post(endpoint([axiosPoint.USER, axiosPoint.logout]), {}, { withCredentials: true });
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      hideLoader();
    }
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {routes.map((item) => (
          <ListItem key={item.text} component={Link} to={item.to}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}> 
          <ListItemText primary="Logout" /> 
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#2676ba', fontWeight: 700 }}>
            InkSpire
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' }, color: '#2676ba' }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {routes.map((item) => (
              <Button
                key={item.text}
                sx={{ color: '#2676ba', marginRight: 2 }}
                component={Link}
                to={item.to}
              >
                {item.text}
              </Button>
            ))}
            <Button
              sx={{ color: '#2676ba', marginRight: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button> 
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </>
  );
};

export default Navbar;
