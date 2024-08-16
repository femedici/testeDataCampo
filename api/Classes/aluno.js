import { MongoClient, ObjectId } from 'mongodb';

class Aluno {
    static db; // Propriedade estática para armazenar o banco de dados

    constructor(nome, neurons = 0, level = 0) {
        this.nome = nome;
        this.neurons = neurons;
        this.level = level;
    }

    // Método para exibir detalhes do aluno
    getDetails() {
        return `Nome: ${this.nome}, Neurons: ${this.neurons}, Level: ${this.level}`;
    }

    // Método para buscar o primeiro aluno no banco de dados
    static async getFirst() {
        try {
            const aluno = await this.db.collection('alunos').findOne({});
            return aluno;
        } catch (error) {
            console.error('Erro ao buscar o primeiro aluno:', error);
        }
    }

    // Método para configurar o banco de dados
    static setDatabase(database) {
        this.db = database;
    }

    // Método para modificar o número de neurons
    static async updateNeurons(nome, novosNeurons) {
        try {
            const result = await this.db.collection('aulas').updateOne(
                { 'students.nome': nome },
                { $set: { 'students.$.neurons': novosNeurons } }
            );
            return result.modifiedCount > 0;
        } catch (error) {
            console.error('Erro ao atualizar neurons do aluno:', error);
            return false;
        }
    }

    // Método para criar um aluno aleatório
    static async createRandomAluno() {
        const randomNumber = Math.floor(Math.random() * 100);
        const nome = `RandomAluno${randomNumber}`;
        const novoAluno = new Aluno(nome);
        return novoAluno;
    }
}

export default Aluno;
