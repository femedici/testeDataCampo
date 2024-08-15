import { ObjectId } from 'mongodb';

class Aula {
  static db = null;  // MongoDB collection reference

  constructor(id, titulo, descricao, cartaz, dataEvento, dataLimite, neurons, limiteParticipantes, nivel, isActive, students) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.cartaz = cartaz;
    this.dataEvento = dataEvento;
    this.dataLimite = dataLimite;
    this.neurons = neurons;
    this.limiteParticipantes = limiteParticipantes;
    this.nivel = nivel;
    this.isActive = isActive;
    this.students = students;
  }

  // Método para exibir detalhes da aula
  getDetails() {
    return `Id: ${this.id}, Título: ${this.titulo}, Descrição: ${this.descricao}, Neurons: ${this.neurons}, Limite de Participantes: ${this.limiteParticipantes}, Nível: ${this.nivel}, Status: ${this.isActive ? 'Ativa' : 'Inativa'}, Participantes: ${this.students.length}`;
  }

  // Método estático para definir o banco de dados
  static setDatabase(database) {
    this.db = database.collection('aulas');
  }

  // Método estático para gerar um ID único de até 3 dígitos
  static async generateUniqueId() {
    let uniqueId;
    let exists = true;
    
    while (exists) {
      uniqueId = Math.floor(100 + Math.random() * 900); // Gera um número entre 100 e 999
      exists = await this.db.findOne({ id: uniqueId });
    }

    return uniqueId;
  }

  // Método estático para buscar uma aula pelo ID
  static async getById(aulaId) {
    try {
      const aula = await this.db.findOne({ _id: new ObjectId(aulaId) });
      if (aula) {
        return new Aula(
          aula.id, aula.titulo, aula.descricao, aula.cartaz,
          aula.dataEvento, aula.dataLimite, aula.neurons, 
          aula.limiteParticipantes, aula.nivel, aula.isActive, 
          aula.students
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar aula por ID:', error);
    }
  }

  // Método estático para criar uma nova aula
  static async create(titulo, descricao, cartaz, dataEvento, dataLimite, neurons, limiteParticipantes, nivel, isActive, students) {
    const id = await this.generateUniqueId();  // Gera um ID único
    const novaAula = { id, titulo, descricao, cartaz, dataEvento, dataLimite, neurons, limiteParticipantes, nivel, isActive, students };
    
    try {
      const result = await this.db.insertOne(novaAula);
      console.log('Aula inserida com sucesso:', result.insertedId);
      return new Aula(id, titulo, descricao, cartaz, dataEvento, dataLimite, neurons, limiteParticipantes, nivel, isActive, students);
    } catch (error) {
      console.error('Erro ao inserir nova aula:', error);
    }
  }
}

export default Aula;
