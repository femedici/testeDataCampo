import React, { useState } from 'react';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';

const studentsData = [
  { name: 'Bennie Frami Sr.', neurons: 1200, level: 'Advanced' },
  { name: 'Bonnie Littel', neurons: 850, level: 'Intermediate' },
  { name: 'Brooke Weimann', neurons: 1300, level: 'Advanced' },
  { name: 'Charlie Schowalter', neurons: 650, level: 'Beginner' },
  { name: 'Dewey Lakin V', neurons: 900, level: 'Intermediate' },
];

export default function StudentList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(studentsData);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = studentsData.filter((student) =>
      student.name.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div>
      <h1>
       Alunos Inscritos na aula *TAL*
      </h1>

      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
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
            {filteredStudents.map((student, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </TableCell>
                <TableCell>{student.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
