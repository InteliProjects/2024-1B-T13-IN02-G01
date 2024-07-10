const assert = require('assert'); //biblioteca do node.js pra fazer testes
const controller = require('../../api/controllers/FavoritesController'); //importa o controller que será usado
const { mockAsync, RESPONSE, FAVORITE } = require('../sinonUtils'); //simula (mocka) uma resposta a partir do sinon
const sinon = require('sinon'); //biblioteca que faz mocks

// O teste propriamente dito
describe('FavoritesController', () => {
  // cria o grupo geral dos testes que serão feitos
  afterEach(() => {
    sinon.restore(); // volta pro original depois que termina o teste, pra não atrapalhar os outros testes que estiverem acontecendo
  });

  //teste específico sobre algo (no caso "create")
  it('Deve criar um handbook com sucesso', async () => {
    const createStub = mockAsync(controller, 'create', FAVORITE); //cria um stub pra substituir o método real do Create. // O stub retorna um objeto fake "FAVORITE".
    const req = {
      body: FAVORITE, // simula uma requisição http, no "body" tem os dados que queremos.
    };
    const result = await controller.create(req, RESPONSE); //aqui é onde montamos as partes geradas anteriormente, unindo uma requisição http acompanhado de um body que contem os resultados, pro método create.

    assert.strictEqual(createStub.calledOnce, true); //ve se o stub so create foi chamado uma unica vez
    assert.deepStrictEqual(result, req.body); //ve se o body é = ao FAVORITES; garante que o próprio método stub create não está modificando os dados no caminho; prevenção de regressoes para quando houver bugs.
  });

  it('Deve listar os favorite com sucesso', async () => {
    const createStub = mockAsync(controller, 'list', FAVORITE); //cria um stub pra substituir o método real do List. // O stub retorna um objeto fake "FAVORITE".
    const req = {
      body: FAVORITE, // simula uma requisição http, no "body" tem os dados que queremos.
    };
    const result = await controller.list(req, RESPONSE); //aqui é onde montamos as partes geradas anteriormente, unindo uma requisição http acompanhado de um body que contem os resultados, pro método list.

    assert.strictEqual(createStub.calledOnce, true); //ve se o stub so list foi chamado uma unica vez
    assert.deepStrictEqual(result, req.body); //ve se o body é = ao FAVORITES; garante que o próprio método stub list não está modificando os dados no caminho; prevenção de regressoes para quando houver bugs.
  });
});
