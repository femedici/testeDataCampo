import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import Aula from './Classes/aula.js';
import Aluno from './Classes/aluno.js';

// Configurações do MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'testDataCampo';

// Inicia o Express
const app = express();
app.use(express.json());
app.use(cors());

// Conectar com o banco e verificar conexão
let db;
async function connectToDB() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Conectado com sucesso ao MongoDB");
    db = client.db(dbName);
    Aula.setDatabase(db);
    Aluno.setDatabase(db);

    // Cria um aluno aleatório ao iniciar o backend
    const randomNumber = Math.floor(Math.random() * 100);
    const randomStudentName = `RandowAluno${randomNumber}`;

    const randomStudent = {
      nome: randomStudentName,
      neurons: 0,
      nivel: 0
    };

    await db.collection('alunos').insertOne(randomStudent);
    console.log(`Aluno criado: ${randomStudentName}`);

  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
  }
}

connectToDB();

//===================================
// Requisições da api 
//===================================

// GET para buscar todas as aulas
app.get('/aulas', async (req, res) => {
  const aulas = await Aula.getAll();
  res.status(200).json(aulas);
});

// GET para buscar o primeiro aluno
app.get('/aluno', async (req, res) => {
  try {
    const aluno = await Aluno.getFirst();
    if (aluno) {
      res.status(200).json(aluno);
    } else {
      res.status(404).send('Nenhum aluno encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar aluno');
  }
});

// POST para criar uma nova aula
app.post('/aulas', async (req, res) => {
  const { titulo, descricao, cartaz, dataEvento, dataLimite, neurons, limiteParticipantes, nivel, isActive, students } = req.body;
  const novaAula = await Aula.create(titulo, descricao, cartaz, new Date(dataEvento), new Date(dataLimite), neurons, limiteParticipantes, nivel, isActive, students);
  res.status(201).json(novaAula.getDetails());
});

// PUT para adicionar aluno na lista de students de uma aula
app.put('/aulas/:id/adicionar-aluno', async (req, res) => {
  const { id } = req.params; // id é o inteiro que você está passando na URL
  const { aluno } = req.body;

  console.log('ID recebido:', id); // Log do ID
  console.log('Aluno recebido:', aluno); // Log do aluno

  try {
    // Busca a aula pelo id como inteiro
    const aula = await db.collection('aulas').findOne({ id: parseInt(id) });

    if (aula) {
      console.log('Aula encontrada:', aula);

      // Verifica se o número de alunos já atingiu o limite de participantes
      if (aula.students.length >= aula.limiteParticipantes) {
        res.status(400).json({ message: 'Limite de participantes atingido.' });
        return;
      }

      if (!aula.students.includes(aluno)) {
        await db.collection('aulas').updateOne(
          { id: parseInt(id) }, // Usa o id como inteiro
          { $push: { students: aluno } }
        );
        res.status(200).json({ message: 'Aluno adicionado à aula com sucesso.' });

      } else {
        res.status(400).json({ message: 'Aluno já está inscrito na aula.' });
      }
    } else {
      console.log('Aula não encontrada.');
      res.status(404).json({ message: 'Aula não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao adicionar aluno à aula:', error); // Log do erro
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});



// PUT para atualizar os neurons de um aluno
app.put('/alunos/update-neurons', async (req, res) => {
  const { nome, novosNeurons } = req.body;

  try {
    const result = await db.collection('alunos').updateOne(
      { nome },
      { $set: { neurons: novosNeurons } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Neurons do aluno atualizados com sucesso.' });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar neurons do aluno:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});


// Configurar servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
