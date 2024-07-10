// Importando a biblioteca Sinon para criar stubs (funções mock)
const sinon = require('sinon');

// Função utilitária para criar um mock (stub) de uma função assíncrona de um modelo
const mockAsync = (model, module, result = null) => {
  // Cria um stub para o método especificado e configura para resolver com o resultado fornecido
  return sinon.stub(model, module).resolves(result);
};

// Objeto de resposta simulada para testes
const RESPONSE = {
  json: function (data) {
    // O método json simplesmente retorna os dados fornecidos, simulando o comportamento de uma resposta HTTP
    return data;
  },
};

// Exemplo de linha de montagem para uso nos testes
const ASSEMBLELINE = {
  id: 8,
  name: 'Linha A',
  description: 'Notebook',
  id_associatedUser: 5,
};

const KANBAN = {
  userid: 8,
  handbookid: 5,
  priority: 'alta',
  assemblelineid: 5,
  handbookname: 'notebook',
  handbookimage: 'image.png',
  assemblelinename: 'linha 1',
};

// Define um objeto TASK que representa uma tarefa com vários atributos
const TASK = {
  // Atributos dde task:
  id: 4,
  isFinished: false,
  uploadDate: '02/05/2006',
  priority: 'baixa',
  id_associatedHandbook: 3,
  id_associatedUser: 5,
};

// Exportando as funções e objetos utilitários para uso em outros scripts
module.exports = {
  mockAsync,
  RESPONSE,
  ASSEMBLELINE,
  KANBAN,
  TASK,
};
