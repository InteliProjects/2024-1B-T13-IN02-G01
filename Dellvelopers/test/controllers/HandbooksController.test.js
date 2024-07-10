const assert = require('assert');
const controller = require('../../api/controllers/HandbooksController');
const { mockAsync, RESPONSE, HANDBOOK } = require('../sinonUtils');
const sinon = require('sinon');

describe('HandbooksController', () => {
  afterEach(() => {
    // Restore the original methods after each test
    sinon.restore();
  });
  it('Deve criar um handbook com sucesso', async () => {
    const createStub = mockAsync(controller, 'create', HANDBOOK);
    const req = {
      body: HANDBOOK,
    };
    const result = await controller.create(req, RESPONSE);

    assert.strictEqual(createStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });
});
