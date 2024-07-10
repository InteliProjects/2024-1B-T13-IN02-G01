/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
/**
 * TasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Cria uma nova tarefa com os dados fornecidos no corpo da requisição, por meio do método GET
  create: async (req, res) => {
    try {
      const task = await Task.create(req.body).fetch();
      return res.json(task);
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Busca todas as tarefas no banco de dados
  list: async (req, res) => {
    try {
      const tasks = await Task.find();
      // Retorna a lista de tarefas em formato JSON
      return res.json(tasks);
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Busca uma tarefa específica pelo ID fornecido nos parâmetros da requisição
  findOne: async (req, res) => {
    try {
      const task = await Task.findOne({ id: req.params.id });
      if (!task) {
        return res.notFound();
      }
      return res.json(task);
    } catch (err) {
      return res.notFound();
    }
  },
  // Atualiza o status de finalização da tarefa com base no parâmetro isFinished
  finished: async (req, res) => {
    try {
      const updatedTask = await Task.update({
        finished: req.params.isFinished,
      }).set(req.body);
      return res.json(updatedTask);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
