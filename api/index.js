import { MongoClient } from 'mongodb';
import Aula from './Classes/aula.js';

// URL de conexão
const url = 'mongodb://localhost:27017';
const dbName = 'testDataCampo';

async function connect() {
  const client = new MongoClient(url);

  try {
    // Conectar ao servidor
    await client.connect();
    console.log("Conectado com sucesso ao MongoDB");

    // Selecionar o banco de dados
    const db = client.db(dbName);

    // Passar o banco de dados para a classe Aula
    Aula.setDatabase(db);

    // Exemplo de criar uma nova aula
    const novaAula = await Aula.create(
      'Introdução à Programação',
      'Aprenda os conceitos básicos de programação',
      'cartaz_url.png',
      new Date('2024-09-01'),
      new Date('2024-08-30'),
      500,
      30,
      'Básico',
      true,
      []
    );
    console.log(novaAula.getDetails());

    // Buscando a aula pelo ID
    const aulaEncontrada = await Aula.getById(novaAula.id);
    if (aulaEncontrada) {
      console.log(aulaEncontrada.getDetails());
    } else {
      console.log('Aula não encontrada.');
    }

  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
  } finally {
    // Fechar conexão (opcional)
    await client.close();
  }
}

connect();