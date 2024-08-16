import moment from 'moment';

class Aula {
  static db = null;

  constructor(id, titulo, descricao, cartaz, dataEvento, dataLimite, neurons, limiteParticipantes, nivel, isActive, students = []) {
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

  // Método estático para buscar uma aula pelo ID
  static async getById(aulaId) {
    try {
      // Buscar aula pelo ID correto
      const aula = await this.db.findOne({ id: aulaId });
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

  // Método para adicionar aluno à lista de students
  async adicionarAluno(aluno) {
    if (!this.students.includes(aluno)) {
      this.students.push(aluno);  // Adiciona o aluno ao array
      try {
        // Corrigir a busca pelo id numérico
        await Aula.db.updateOne({ id: this.id }, { $set: { students: this.students } });
        console.log(`Aluno ${aluno} adicionado à aula.`);
      } catch (error) {
        console.error('Erro ao adicionar aluno à aula:', error);
      }
    }
    return this;
  }

  // Método estático para buscar todas as aulas
  static async getAll() {
    try {
      const aulas = await this.db.find({}).toArray();
      return aulas.map(aula => new Aula(
        aula.id, aula.titulo, aula.descricao, aula.cartaz,
        aula.dataEvento, aula.dataLimite, aula.neurons,
        aula.limiteParticipantes, aula.nivel, aula.isActive,
        aula.students
      ));
    } catch (error) {
      console.error('Erro ao buscar todas as aulas:', error);
    }
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

  // Método estático para criar uma nova aula
  static async create(titulo, descricao, cartaz, dataEvento, dataLimite, neurons, limiteParticipantes, nivel, isActive, students) {
    const id = await this.generateUniqueId();  // Gera um ID único

    // Formatar as datas para o formato 'DD/MM/YYYY' (verificar compatibilidade)
    const formattedDataEvento = moment(dataEvento).format('DD/MM/YYYY');
    const formattedDataLimite = moment(dataLimite).format('DD/MM/YYYY');

    const novaAula = {
      id,
      titulo,
      descricao,
      cartaz,
      dataEvento: formattedDataEvento,
      dataLimite: formattedDataLimite,
      neurons,
      limiteParticipantes,
      nivel,
      isActive,
      students: []
    };

    try {
      const result = await this.db.insertOne(novaAula);
      console.log('Aula inserida com sucesso:', result.insertedId);
      return new Aula(id, titulo, descricao, cartaz, formattedDataEvento, formattedDataLimite, neurons, limiteParticipantes, nivel, isActive, students);
    } catch (error) {
      console.error('Erro ao inserir nova aula:', error);
    }
  }
}

export default Aula;
