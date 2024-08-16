import './App.css';
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateClasses from './pages/CreateClasses';
import ListClasses from './pages/ListClasses';
import SignClasses from './pages/SignClasses';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';

const drawerWidth = 240; // Mesma largura da sidebar

function App() {
  return (
    <Router>
      <Box //componente para fazer a margem do sidebar
        component="main"
        sx={{
          flexGrow: 1,
          p: 2, // Reduzindo o padding geral para 16px
          marginLeft: `${drawerWidth}px`,
          marginTop: '2px' // Ajuste da margem superior
        }}
      >
      <Routes>
        <Route path="/create-professor" element={<CreateClasses />} />
        <Route path="/" element={<ListClasses />} />
        <Route path="/sign-student" element={<SignClasses />} />
      </Routes>
      <Sidebar />
      </Box>
    </Router>
  );
}

export default App;
