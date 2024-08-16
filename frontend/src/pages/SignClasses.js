import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
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
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

const SignClasses = () => {
  const [classesData, setClassesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  // Função para buscar as aulas do backend
  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/aulas');
      setClassesData(response.data);
      setFilteredClasses(response.data); // Inicialmente, mostra todas as aulas
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao buscar as aulas:', error);
    }
  };

  useEffect(() => {
    // Chama a função quando o componente for montado
    fetchClasses();
  }, []);

  // Função para pegar as informações do aluno
  const fetchStudentInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/aluno');
      setStudentInfo(response.data);
    } catch (error) {
      console.error('Erro ao buscar as informações do aluno:', error);
    }
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  // Função para filtrar as aulas pelo título
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = classesData.filter((classItem) =>
      classItem.titulo.toLowerCase().includes(query)
    );
    setFilteredClasses(filtered);
  };

  // Função para se inscrever em uma aula
  const handleEnroll = async (classId) => {
    if (!studentInfo) {
      console.error('Informações do aluno não carregadas.');
      return;
    }

    const selectedClass = filteredClasses.find((classItem) => classItem.id === classId);
    if (!selectedClass) {
      console.error('Aula não encontrada.');
      return;
    }

    // Verifica se o aluno já está inscrito na aula
    if (selectedClass.students.includes(studentInfo.nome)) {
      setAlert({ message: 'Aluno já está inscrito na aula.', severity: 'warning' });
      return;
    }

    // Verifique as condições para inscrição
    const currentDate = new Date();
    const deadlineDate = new Date(selectedClass.dataLimite);
    const studentNeurons = studentInfo.neurons;
    const studentLevel = studentInfo.nivel;

    if (currentDate > deadlineDate) {
      console.error('Inscrição não permitida: já passou a data limite para esta aula.');
      setAlert({ open: true, message: 'Inscrição não permitida: já passou a data limite para esta aula.', severity: 'error' });
      return;
    }

    if (studentNeurons < selectedClass.neurons) {
      console.error('Inscrição não permitida: número de neurons insuficiente.');
      setAlert({ open: true, message: 'Inscrição não permitida: número de neurons insuficiente.', severity: 'error' });
      return;
    }

    if (studentLevel < selectedClass.nivel) {
      console.error('Inscrição não permitida: nível do aluno é inferior ao nível necessário.');
      setAlert({ open: true, message: 'Inscrição não permitida: nível do aluno é inferior ao nível necessário.', severity: 'error' });
      return;
    }

    // Se todas as condições forem atendidas, vai chegar a esse nivel
    try {
      // Envia requisição para se inscrever na aula
      await axios.put(`http://localhost:3000/aulas/${classId}/adicionar-aluno`, {
        aluno: studentInfo.nome
      });

      // Atualiza os neurons do aluno
      await axios.put('http://localhost:3000/alunos/update-neurons', {
        nome: studentInfo.nome,
        novosNeurons: studentNeurons - selectedClass.neurons
      });

      setAlert({ open: true, message: 'Inscrição realizada com sucesso.', severity: 'success' });
      console.log('Inscrição realizada com sucesso.');
    } catch (error) {
      console.error('Erro ao se inscrever na aula:', error);
      setAlert({ open: true, message: 'Ocorreu um erro ao inscrever.', severity: 'error' });
    }

  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Grid para o título e o card azul */}
        <Grid item xs={12} md={9}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#020341'
            }}
          >
            Se inscreva em uma aula
          </Typography>
        </Grid>

        {/* Card Azul para Neuros e Nível Atual */}
        <Grid item xs={12} md={3}>
          <Card sx={{
            backgroundColor: '#023a58',
            color: 'white',
            padding: 2,
            width: 240,
            borderRadius: 1
          }}>
            <CardContent>
              {studentInfo ? (
                <>
                  <Typography variant="h6">
                    {studentInfo.nome}
                  </Typography>
                  <Typography variant="small">
                    Neurons: {studentInfo.neurons}
                  </Typography>
                  <br />
                  <Typography variant="small">
                    Nível Atual: {studentInfo.nivel}
                  </Typography>
                </>
              ) : (
                <Typography variant="h6">
                  Carregando informações do aluno...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div>
        {/* Exibe o alerta se a condição for atendida */}
        {alert && (
          <Alert variant="filled" severity={alert.severity} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}
      </div>

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
        {filteredClasses.map((classItem) => (
          <Grid item xs={12} md={3} key={classItem._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                src={classItem.cartaz}
                alt={classItem.titulo}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {classItem.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Descrição: {classItem.descricao}<br />
                  Nível necessário: {classItem.nivel}<br />
                  Neurons necessário: {classItem.neurons}<br />
                  Data de Criação: {classItem.dataEvento}<br />
                  Data Limite: {classItem.dataLimite}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  endIcon={<FileDownloadDoneIcon />}
                  onClick={() => handleEnroll(classItem.id)}
                  size="small" // Torna o botão menor
                >
                  Se inscrever
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SignClasses;
