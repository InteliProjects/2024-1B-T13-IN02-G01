const assert = require('assert');
const controller = require('../../api/controllers/KanbanController');
const kanban = require('../../api/controllers/KanbanController');
const { mockAsync, RESPONSE, KANBAN } = require('../util/');
describe('KanbanController', () => {
  it('Deve realizar consulta Kanban com sucesso', async () => {
    const databaseStub = mockAsync(kanban, 'tasksUnfinished', true); // Mock da função tasksUnfinished do controlador
    const req = {
      body: KANBAN,
    };

    // Act: Chama a função tasksUnfinished do controlador
    const result = await controller.tasksUnfinished(req, RESPONSE);

    // Assert
    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, true);
  });
});
