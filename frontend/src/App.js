import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateClasses from './pages/CreateClasses';
import ListClasses from './pages/ListClasses';
import SignClasses from './pages/SignClasses';
import ViewClass from './pages/ViewClass';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';

const drawerWidth = 240; // Mesma largura da sidebar

function App() {
  return (
    <Router>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }} // Ajustando a margem à esquerda
      >
        <Routes>
          <Route path="/create-professor" element={<CreateClasses />} />
          <Route path="/" element={<ListClasses />} />
          <Route path="/sign-student" element={<SignClasses />} />
          <Route path="/view-professor" element={<ViewClass />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
