import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';

const ListClasses = () => {
  const [classesData, setClassesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

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

  // Função para filtrar as aulas pelo título
  const handleSearchClass = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = classesData.filter((classItem) =>
      classItem.titulo.toLowerCase().includes(query)
    );
    setFilteredClasses(filtered);
  };

  const StudentList = ({ students }) => {
    const [studentSearchQuery, setStudentSearchQuery] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(students || []);

    const handleStudentSearch = (event) => {
      const query = event.target.value.toLowerCase();
      setStudentSearchQuery(query);

      const filtered = students.filter((student) =>
        student.toLowerCase().includes(query)
      );
      setFilteredStudents(filtered);
    };

    return (
      <>
        {/* Campo de busca para alunos */}
        <TextField
          label="Search students by name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={studentSearchQuery}
          onChange={handleStudentSearch}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </TableCell>
                    <TableCell>{student}</TableCell> {/* Exibe o nome diretamente */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography>No students found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };



  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
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
            Lista de Aulas Disponíveis
          </Typography>
        </Grid>
      </Grid>

      {/* Campo de Pesquisa */}
      <TextField
        label="Search by class title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchClass}
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
                sx={{ alignItems: 'center' }}
              >
                {/* Imagem de capa da aula */}
                <img
                  src={classItem.cartaz}
                  alt={classItem.titulo}
                  style={{
                    width: '50px', // Ajuste a largura conforme necessário
                    height: '50px', // Ajuste a altura conforme necessário
                    marginRight: '15px', // Espaçamento entre a imagem e o texto
                    objectFit: 'cover', // Ajusta a imagem para cobrir o espaço, sem distorcer
                    borderRadius: '4px' // Deixa os cantos arredondados, se desejar
                  }}
                />
                <Typography>{classItem.titulo}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{classItem.descricao}</Typography>

                {/* Listagem de Alunos com busca por nome */}
                <Typography variant="h6" gutterBottom>
                  Alunos Inscritos na {classItem.titulo}
                </Typography>
                <StudentList students={classItem.students} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>

    </Box >
  );
};

export default ListClasses;
