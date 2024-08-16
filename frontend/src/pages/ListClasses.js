import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ListClasses = () => {
  const classesData = [
    { title: 'Class 1', description: 'Description for Class 1' },
    { title: 'Class 2', description: 'Description for Class 2' },
    { title: 'Class 3', description: 'Description for Class 3' },
    { title: 'Class 4', description: 'Description for Class 4' },
    { title: 'Class 5', description: 'Description for Class 5' },
    { title: 'Class 6', description: 'Description for Class 6' },
    { title: 'Class 7', description: 'Description for Class 7' },
    { title: 'Class 8', description: 'Description for Class 8' }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState(classesData);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = classesData.filter((classItem) =>
      classItem.title.toLowerCase().includes(query)
    );
    setFilteredClasses(filtered);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Aulas Disponíveis no Sistema
      </Typography>

      {/* Campo de Pesquisa */}
      <TextField
        label="Search by class title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Grid para exibir os painéis */}
      <Grid container spacing={3}>
        {filteredClasses.map((classItem, index) => (
          <Grid item xs={12} key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{classItem.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {classItem.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListClasses;
