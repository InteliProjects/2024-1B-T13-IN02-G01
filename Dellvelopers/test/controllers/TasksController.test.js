const assert = require('assert'); // Importa o módulo assert do node.js para validação de testes
const controller = require('../../api/controllers/TasksController'); // Importa o controller de Task
const tasks = require('../../api/controllers/TasksController');
const { mockAsync, RESPONSE, TASK } = require('../util'); // Importa funções e constantes do arquivo util para mock e respostas

describe('TasksController', () => {
  // Teste para verificar se uma task é criada com sucesso
  it('Deve criar uma task com sucesso', async () => {
    // Parte do Arrange do AAA
    // Cria um mock para a função 'create' do controller de tasks
    const databaseStub = mockAsync(tasks, 'create', true);
    // Define o objeto de requisição com os dados da task
    const req = {
      body: TASK,
    };

    // Parte do Act no AAA
    // Executa a função 'create' do controller com a requisição mockada e a resposta esperada
    const result = await controller.create(req, RESPONSE);

    // Parte do Assert do AAA
    assert.strictEqual(databaseStub.calledOnce, true); // Verifica se a função mockada foi chamada uma vez
    assert.deepStrictEqual(result, true); // Verifica se o resultado da função 'create' é verdadeiro
  });

  // Teste para verificar se uma task é listada com sucesso
  it('Deve listar uma task com sucesso', async () => {
    // Parte do Arrange do AAA
    // Cria um mock para a função 'list' do controller de tasks
    const databaseStub = mockAsync(tasks, 'list', true);
    // Define o objeto de requisição com os dados da task
    const req = {
      body: TASK,
    };

    // Parte do Act no AAA
    // Executa a função 'list' do controller com a requisição mockada e a resposta esperada
    const result = await controller.list(req, RESPONSE);

    // Parte do Assert do AAA
    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });

  // Teste para verificar se uma task é atualizada com sucesso
  it('Deve atualizar uma task com sucesso', async () => {
    // Parte do Arrange do AAA
    // Cria um mock para a função 'finished' do controller de tasks
    const databaseStub = mockAsync(tasks, 'finished', true);
    const req = {
      body: TASK,
    };

    // Parte do Act no AAA
    // Executa a função 'finished' do controller com a requisição mockada e a resposta esperada
    const result = await controller.finished(req, RESPONSE);

    // Parte do Assert do AAA
    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });
});
