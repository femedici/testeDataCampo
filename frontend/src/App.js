import './App.css';
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateClasses from './pages/CreateClasses';
import ListClasses from './pages/ListClasses';
import SignClasses from './pages/SignClasses';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';

const drawerWidth = 240; 

function App() {
  return (
    <Router>
      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          p: 2, 
          marginLeft: `${drawerWidth}px`,
          marginTop: '2px' 
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
