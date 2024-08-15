import { MongoClient, ObjectId } from 'mongodb';

class Aluno {
    constructor(id, nome, neurons, level) {
        this.id = id;
        this.nome = nome;
        this.neurons = neurons;
        this.level = level;
    }

    // Método para exibir detalhes do usuário
    getDetails() {
        return `Id ${this.id}, Nome: ${this.nome}, Neurons: ${this.neurons}, Level: ${this.level}`;
    }

    // Método estático para se conectar ao banco de dados
    static async connect() {
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        await client.connect();
        console.log("Conectado ao MongoDB");
        return client.db('escola').collection('alunos'); // Retorna a coleção "alunos"
    }

    // Método estático para buscar um aluno pelo ID
    static async getById(alunoId) {
        const collection = await this.connect();
        try {
            const aluno = await collection.findOne({ _id: new ObjectId(alunoId) });
            if (aluno) {
                return new Aluno(aluno._id, aluno.nome, aluno.neurons, aluno.level);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar aluno por ID:', error);
        }
    }

    // // Método estático para criar um novo aluno
    // static async create(nome, neurons, level) {
    //     const collection = await this.connect();
    //     const novoAluno = { nome, neurons, level };
    //     try {
    //         const result = await collection.insertOne(novoAluno);
    //         console.log('Aluno inserido com sucesso:', result.insertedId);
    //         return new Aluno(result.insertedId, nome, neurons, level);
    //     } catch (error) {
    //         console.error('Erro ao inserir novo aluno:', error);
    //     }
    // }
}

export default Aluno;