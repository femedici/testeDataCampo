import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  TextField,
  CardActions,
  Button
} from '@mui/material';

const ListClasses = () => {
  // Adicione URLs de imagens aos dados das aulas
  const classesData = [
    { title: 'Class 1', description: 'Description for Class 1', imageUrl: 'https://s2-g1.glbimg.com/c1tS_axTjV_qDkmMeMs3wYZCgGY=/0x0:5472x3648/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/H/v/pTatikTlSIWRuTzd0JwA/j9a6180.jpg' },
    { title: 'Class 2', description: 'Description for Class 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRMJ92bzkQYFR8Po_EimlMacdc4SBYp9rm7Q&s' },
    { title: 'Class 3', description: 'Description for Class 3', imageUrl: 'https://s2-techtudo.glbimg.com/1o2J-rf2G9qtlQlm82gaq-mFBec=/0x129:1024x952/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/7/i/ME2AxRRoygUyFPCDe0jQ/3.png' },
    { title: 'Class 4', description: 'Description for Class 4', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Class 5', description: 'Description for Class 5', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Class 6', description: 'Description for Class 6', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Class 7', description: 'Description for Class 7', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Class 8', description: 'Description for Class 8', imageUrl: 'https://via.placeholder.com/150' }
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
        Se inscreva em uma aula
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

      {/* Grid para exibir os cards */}
      <Grid container spacing={3}>
        {filteredClasses.map((classItem, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Adicione a URL da imagem no CardMedia */}
              <CardMedia
                component="img"
                height="140"
                image={classItem.imageUrl}
                alt={classItem.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {classItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {classItem.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Se inscrever</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListClasses;
