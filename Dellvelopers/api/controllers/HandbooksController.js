/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
// Função para verificar o token de autenticação
const verifyToken = (req) => {
  const token = req.cookies.token;
  if (!token) {
    throw Error('No token found');
  }
  try {
    const decoded = jwt.verify(token, 'DellvelopersSecret');
    return decoded.user;
  } catch (err) {
    throw Error('Invalid token');
  }
};

module.exports = {
  // Função para listar todos os handbooks que ocorre por meio de uma operação GET
  list: async (req, res) => {
    try {
      // Busca todos os handbooks e popula o campo id_associatedAssembleLine
      const handbooks = await Handbook.find().populate(
        'id_associatedAssembleLine'
      );
      return res.json(handbooks);
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Função para visualizar e editar um handbook específico, por meio de uma operação GET e POST passando como parametro o ID do usuário.
  viewEdit: async (req, res) => {
    try {
      // Busca um handbook específico pelo ID
      const handbook = await Handbook.findOne({ id: req.params.id });
      if (!handbook) {
        return res.notFound();
      }

      const userAuthData = verifyToken(req);
      const userRequest = await sails.models.user.findOne({ id: userAuthData });

      if (
        userRequest.accessLevel !== 'adm' &&
        userRequest.accessLevel !== '2'
      ) {
        return res.view('404', { userRequest });
      }

      return res.view('pages/editarHandbook', { handbook, user: userRequest });
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Função para visualizar um handbook específico por meio de um método GET
  findOne: async (req, res) => {
    try {
      // Busca um handbook específico pelo ID
      const handbook = await Handbook.findOne({ id: req.params.id });
      if (!handbook) {
        return res.notFound();
      }

      const userAuthData = verifyToken(req);
      const user = await sails.models.user.findOne({ id: userAuthData });

      return res.view('pages/verManual', { handbook, user });
    } catch (err) {
      return res.notFound();
    }
  },
  // Função para criar um novo handbook por meio de um método POST
  create: async (req, res) => {
    try {
      const {
        productName,
        productDescription,
        productImage,
        assembleLine,
        publicationDate,
      } = req.body;

      if (
        !productName ||
        !productDescription ||
        !assembleLine ||
        !publicationDate
      ) {
        return res.badRequest({ error: 'Missing fields' });
      }
      // Cria um novo registro de handbook com os dados fornecidos
      const handbook = await Handbook.create({
        name: productName,
        productName: productName,
        uploadDate: new Date().getTime(),
        publicationDate: publicationDate,
        description: productDescription,
        images: productImage,
        id_associatedAssembleLine: parseInt(assembleLine),
      }).fetch();
      return res.json(handbook);
    } catch (err) {
      console.error(err);
      return res.badRequest(err);
    }
  },
  // Função para atualizar um handbook existente, com duas operações GET e POST 
  update: async (req, res) => {
    try {
      // Atualiza o handbook com os dados fornecidos no corpo da requisição
      const handbook = await Handbook.updateOne({ id: req.params.id }).set(
        req.body
      );
      if (!handbook) return res.notFound();
      return res.json(handbook);
    } catch (err) {
      return res.badRequest(err);
    }
  },
  // Função para deletar um handbook existente por meio do metodo DELETE
  destroy: async (req, res) => {
    try {
      // Deleta o handbook pelo ID
      await Handbook.destroyOne({ id: req.params.id });
      return res.ok();
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }
  },
};
