const assert = require('assert');
const userController = require('../../../api/controllers/UsersController');
const sinon = require('sinon');

const mockAsync = (model, module, result = null) => {
  return sinon.stub(model, module).resolves(result);
};

const response = {
  json: (data) => data,
  serverError: (err) => err,
  ok: () => true,
};

describe('UsersController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Deve listar todos os usuários', async () => {
    const databaseStub = mockAsync(User, 'find', {
      0: {
        id: 1,
        name: 'Kesney Lucas Ferro de Oliveira',
        email: 'kesney@gmail.com',
        gender: 'M',
        accessLevel: 'adm',
        password:
          '$2a$10$pUymM9PBSL1iU5CWrLcYF.8sM/CjLp2Key/d71eTn2sBMDZvowmaq',
      },
    });

    const result = await userController.list({}, response);

    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, [
      {
        id: 1,
        name: 'Kesney Lucas Ferro de Oliveira',
        email: 'kesney@gmail.com',
        gender: 'M',
        accessLevel: 'adm',
      },
    ]);
  });

  it('Deve retornar um usuário específico', async () => {
    const databaseStub = mockAsync(User, 'findOne', {
      0: {
        id: 1,
        name: 'Kesney Lucas Ferro de Oliveira',
        email: 'kesney@gmail.com',
        gender: 'M',
        accessLevel: 'adm',
        password:
          '$2a$10$pUymM9PBSL1iU5CWrLcYF.8sM/CjLp2Key/d71eTn2sBMDZvowmaq',
      },
    });

    const req = {
      params: {
        id: 1,
      },
    };

    const result = await userController.findOne(req, response);

    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, {
      0: {
        id: 1,
        name: 'Kesney Lucas Ferro de Oliveira',
        email: 'kesney@gmail.com',
        gender: 'M',
        accessLevel: 'adm',
        password:
          '$2a$10$pUymM9PBSL1iU5CWrLcYF.8sM/CjLp2Key/d71eTn2sBMDZvowmaq',
      },
    });
  });

  it('Deve atualizar um usuário com sucesso', async () => {
    const databaseStub = mockAsync(User, 'updateOne', {
      set: sinon.stub().resolves({
        id: 1,
        name: 'Kesney Ferro',
        email: 'kesney@gmail.com',
        gender: 'M',
        accessLevel: 'adm',
        password:
          '$2a$10$pUymM9PBSL1iU5CWrLcYF.8sM/CjLp2Key/d71eTn2sBMDZvowmaq',
      }),
    });

    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Kesney Ferro',
      },
    };

    const result = await userController.update(req, response);

    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, {
      id: 1,
      name: 'Kesney Ferro',
      email: 'kesney@gmail.com',
      gender: 'M',
      accessLevel: 'adm',
      password: '$2a$10$pUymM9PBSL1iU5CWrLcYF.8sM/CjLp2Key/d71eTn2sBMDZvowmaq',
    });
  });

  it('Deve criar um usuário com sucesso', async () => {
    const databaseStub = mockAsync(User, 'create', {
      fetch: function () {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              name: 'Kesney Lucas Ferro de Oliveira',
              email: 'kesney@gmail.com',
              gender: 'M',
              accessLevel: 'adm',
              password:
                '$2a$10$pUymM9PBSL1iU5CWrLcYF.8sM/CjLp2Key/d71eTn2sBMDZvowmaq',
            });
          }, 0);
        });
      },
    });

    const req = {
      body: {
        name: 'Kesney Lucas Ferro de Oliveira',
        email: 'kesney@gmail.com',
        password: '123456',
        gender: 'M',
        accessLevel: 'adm',
      },
    };

    const result = await userController.create(req, response);

    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, {
      name: 'Kesney Lucas Ferro de Oliveira',
      email: 'kesney@gmail.com',
      gender: 'M',
      accessLevel: 'adm',
      password: '$2a$10$pUymM9PBSL1iU5CWrLcYF.8sM/CjLp2Key/d71eTn2sBMDZvowmaq',
    });
  });

  it('Deve remover um usuário com sucesso', async () => {
    const databaseStub = mockAsync(User, 'destroyOne', {
      id: 1,
      name: 'Kesney Lucas Ferro de Oliveira',
      email: 'kesney@gmail.com',
      gender: 'M',
      accessLevel: 'adm',
      password: '$2a$10$pUymM9PBSL1iU5CWrLcYF.8sM/CjLp2Key/d71eTn2sBMDZvowmaq',
    });

    const req = {
      params: {
        id: 1,
      },
    };

    const result = await userController.destroy(req, response);

    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });
});
