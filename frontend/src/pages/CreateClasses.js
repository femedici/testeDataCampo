import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';

const EventForm = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    cartaz: '',
    dataEvento: '',
    dataLimite: '',
    neurons: [],
    limiteParticipantes: [],
    nivel: [],
    isActive: true,
    students: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isActive: e.target.checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar os dados para o backend
      const response = await axios.post('http://localhost:5000/api/events', formData);
      console.log('Resposta do servidor:', response.data);
      // Aqui você pode adicionar lógica adicional, como mostrar uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      // Aqui você pode adicionar lógica adicional, como mostrar uma mensagem de erro
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cadastre uma  Aula
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              label="Título"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              label="Caminho da Imagem para o Cartaz"
              name="cartaz"
              value={formData.cartaz}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Data do Evento"
              name="dataEvento"
              type="date"
              value={formData.dataEvento}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Data Limite"
              name="dataLimite"
              type="date"
              value={formData.dataLimite}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Neurons Necessários"
              name="neurons"
              type="number"
              value={formData.neurons}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Limite de Participantes"
              name="limiteParticipantes"
              type="number"
              value={formData.limiteParticipantes}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="nivel-label">Nível</InputLabel>
              <Select
                labelId="nivel-label"
                id="nivel-select"
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                label="Nível"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isActive}
                  onChange={handleCheckboxChange}
                  name="isActive"
                  color="primary"
                />
              }
              label="Evento Ativo"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Cadastrar Aula
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EventForm;
