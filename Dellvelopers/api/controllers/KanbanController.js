/**
 * KanbanController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Reliza um requisição por meio de uma query SQL para visualizar as tarefas que não foram finalizadas
  tasksUnfinished: async (req, res) => {
    try {
      const taskFilter = `
        SELECT "user".id AS userId, "task"."id_associatedHandbook" AS handbookId, task.priority, 
        handbook."id_associatedAssembleLine" AS assembleLineId, handbook."name" AS handbookname, 
        handbook."images" AS handbookimage, task."isFinished" as finished, "assembleLine"."name" as assemblename
        FROM public.task 
        INNER JOIN public.user ON "user".id = task."id_associatedUser"
        INNER JOIN public.handbook ON "task"."id_associatedHandbook" = handbook.id
        inner join public."assembleLine" on handbook."id_associatedAssembleLine" = "assembleLine"."id"
        WHERE "isFinished" = false
      `;
      // Executa a query SQL e armazena o resultado na variável 'unfinished'
      const unfinished = await Task.getDatastore().sendNativeQuery(taskFilter);
      sails.log('unfinished', unfinished.rows);

      if (!unfinished.rows.length) {
        sails.log('Tarefas Completas');
      }
      return res.json(unfinished.rows);
    } catch (err) {
      sails.log.error('Erro ao requisitar tasks:', err);
      return res.status(500).json({ error: 'Erro ao requisitar tasks' });
    }
  },
  // Define a query SQL para selecionar as tarefas finalizadas
  tasksFinished: async (req, res) => {
    try {
      const taskFilter = `
        SELECT "user".id AS userId, "task"."id_associatedHandbook" AS handbookId, task.priority, 
        handbook."id_associatedAssembleLine" AS assembleLineId, handbook."name" AS handbookname, 
        handbook."images" AS handbookimage, task."isFinished" as finished, "assembleLine"."name" as assemblename
        FROM public.task 
        INNER JOIN public.user ON "user".id = task."id_associatedUser"
        INNER JOIN public.handbook ON "task"."id_associatedHandbook" = handbook.id
        inner join public."assembleLine" on handbook."id_associatedAssembleLine" = "assembleLine"."id"
        WHERE "isFinished" = true
      `;
      const finished = await Task.getDatastore().sendNativeQuery(taskFilter);
      sails.log('finished', finished.rows);

      if (!finished.rows.length) {
        sails.log('Tarefas Completas');
      }
       // Retorna as tarefas finalizadas em formato JSON
      return res.json(finished.rows);
    } catch (err) {
      sails.log.error('Erro ao requisitar tasks:', err);
      return res.status(500).json({ error: 'Erro ao requisitar tasks' });
    }
  },
};
