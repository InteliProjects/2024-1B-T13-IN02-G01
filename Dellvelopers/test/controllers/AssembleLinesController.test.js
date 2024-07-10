// Importando informações de outros script
const assert = require('assert');
const controller = require('../../api/controllers/AssembleLinesController');
const AssembleLines = require('../../api/controllers/AssembleLinesController');
const { mockAsync, RESPONSE, ASSEMBLELINE } = require('../util/');

// Descrição de como funcionarão os testes unitários
describe('AssembleLinesController', () => {
  // Este teste deve testar a função create do controller de assembleLines
  it('Deve criar linha de montagem com sucesso', async () => {
    const databaseStub = mockAsync(AssembleLines, 'create', true); // Mock da função create do controlador
    const req = {
      body: ASSEMBLELINE, // Requisição de exemplo para o teste
    };

    // Act: Chama a função create do controlador
    const result = await controller.create(req, RESPONSE);

    // Assert: Verifica se a função foi chamada e se o resultado é o esperado
    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });

  // Este teste deve testar a função delete do controller de assembleLines
  it('Deve deletar linha de montagem com sucesso', async () => {
    const databaseStub = mockAsync(AssembleLines, 'delete', true); // Mock da função delete do controlador
    const req = {
      body: ASSEMBLELINE,
    };

    // Act: Chama a função delete do controlador
    const result = await controller.delete(req, RESPONSE);

    // Assert
    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });

  // Este teste deve testar a função list do controller de assembleLines
  it('Deve listar linhas de montagem com sucesso', async () => {
    const databaseStub = mockAsync(AssembleLines, 'list', true); // Mock da função list do controlador
    const req = {
      body: ASSEMBLELINE, // Requisição de exemplo para o teste
    };

    // Act: Chama a função list do controlador
    const result = await controller.list(req, RESPONSE);

    // Asser
    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });

  // Este teste deve testar a função getQuery do controller de assembleLines
  it('Deve realizar queries com sucesso', async () => {
    const databaseStub = mockAsync(AssembleLines, 'getQuery', true); // Mock da função getQuery do controlador
    const req = {
      body: ASSEMBLELINE,
    };

    // Act: Chama a função getQuery do controlador
    const result = await controller.getQuery(req, RESPONSE);

    // Assert
    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });
});
