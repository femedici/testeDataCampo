# API - Cadastro Aulas e Curso (TesteDataCampo)
> Aplicação desenvolvida para teste para vaga de desenvolvimento na empresa DataCampo.

## Descrição
O sistema tem interface para listar aulas, onde pode filtrar as aulas registradas, verificar os alunos inscritos naquela aula selecionada.
Pode cadastrar novas aulas com os campos requisitados.
Simular a visão de um aluno, onde pode se cadastrar em uma aula, dependendo das seguintes regras:
- A data atual deve ser menor ou igual à data limite da aula.
- O nível do aluno deve ser menor ou igual ao da aula.
- O aluno deve ter número de neurons suficiente para "debitar" o valor necessário para se inscrever na aula.
- A turma da aula não pode estar cheia.

## Estrutura
A aplicação está estrutura em front-end e back-end, sendo as duas aplicações presentes nesse repositório.

A pasta '\api' representa o back-end, desenvolvido em Node.js com MongoDB de banco de dados
A pasta '\frontend' representa o front-end, desenvolvido em React.js

As portas de execução são: 3000 - api || 3001 - front 
Porta de conexão ao mongo: mongodb://localhost:27017

Ao iniciar a aplicação, é gerado um aluno aleatório. Com valor de neurons e nivel zerados, para serem alterados direto no banco.

### Linguagens e Tecnologias
**Front-end:** 
[![My Skills](https://skillicons.dev/icons?i=react,js)](https://skillicons.dev)

**Back-end:** 
[![My Skills](https://skillicons.dev/icons?i=nodejs,mongodb)](https://skillicons.dev)




