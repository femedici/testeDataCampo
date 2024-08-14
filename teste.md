# Teste para Vaga de Estágio - Desenvolvedor de Sistemas Web (Node e React)

## Descrição

O objetivo deste teste é avaliar suas habilidades no desenvolvimento de um sistema de compra de ingressos para aulas remotas. O sistema deve permitir que professores cadastrem aulas e que alunos se inscrevam nessas aulas, respeitando as regras de negócio descritas abaixo.

## Regras de Negócio

### 1. Cadastro de Aulas (Professor)

O sistema deve ter uma interface onde o professor pode cadastrar uma aula. Os campos obrigatórios e as regras para o cadastro são:

```json
{
  "titulo*": "string",
  "descricao*": "string",
  "cartaz*": "string", /* caminho da imagem */
  "dataEvento*": "date",
  "dataLimite*": "date",
  "neurons*": "number", /* número de neurons necessários para se inscrever */
  "limiteParticipantes*": "number", /* máximo de alunos */
  "nivel*": "number[]", /* números entre 1 e 7 */
  "isActive": "bool", /* default true */
  "students": "studentsId[]" /* Alunos inscritos */
}
```
**Campos obrigatórios**: Todos os campos marcados com `*` são obrigatórios.

### 2. Consulta de Alunos Inscritos (Professor)

Deve existir uma interfa    ce onde o professor pode consultar os alunos inscritos em uma aula específica. Essa interface deve listar todos os alunos que se inscreveram na aula selecionada.

### 3. Inscrição em Aulas (Aluno)

O sistema deve ter uma interface para que o aluno possa se inscrever em uma aula. A estrutura de dados do aluno é a seguinte:

```json
{
  "nome": "string",
  "neurons": "number",
  "level": "number" 
}
```

**Regras para Inscrição**:
- O aluno só pode se inscrever se a data atual for menor ou igual à data limite de inscrição.
- O nível do aluno deve estar dentro do intervalo estipulado pela aula cadastrada.
- O aluno deve ter um número de neurons suficiente (maior ou igual ao exigido pela aula).
- Após a inscrição, o número de neurons do aluno deve ser debitado, e o nome ou ID do aluno deve ser inserido no array `students` da aula.

## Tecnologias

O sistema deve ser desenvolvido utilizando:
- **Backend**: Node.js
- **Frontend**: React.js

### Bibliotecas
Você pode utilizar as bibliotecas que julgar necessário para a implementação.

### Banco de Dados
Você pode armazenar os dados utilizando uma das seguintes opções:
- SQLite
- Arquivo no formato JSON
- Banco de dados de sua preferência

## Entrega

O código deve ser enviado em um repositório Git (GitHub, GitLab, etc.), e o link deve ser compartilhado para avaliação.

---

Boa sorte! Se tiver alguma dúvida, sinta-se à vontade para entrar em contato.
