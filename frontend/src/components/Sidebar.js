import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import logo from '../logo.png';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CardMembershipIcon from '@mui/icons-material/CardMembership';


const drawerWidth = 240;

function Sidebar() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar Lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto', textAlign: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '150px', marginTop: '40px' }} />

          <Toolbar />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Aulas Disponíveis" />
            </ListItem>

            <ListItem button component={Link} to="/create-professor">
              <ListItemIcon>
                <LibraryAddIcon />
              </ListItemIcon>
              <ListItemText primary="Criar Aula" />
            </ListItem>

            <ListItem button component={Link} to="/sign-student">
              <ListItemIcon>
                <CardMembershipIcon />
              </ListItemIcon> 
              <ListItemText primary="Inscrição (Aluno)" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Sidebar;
