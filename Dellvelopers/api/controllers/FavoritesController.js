/* eslint-disable linebreak-style */
/**
 * FavoritesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
// Função para verificar o token de autenticação
const verifyToken = (req) => {
  // Obtém o token dos cookies da requisição
  const token = req.cookies.token;
  if (!token) {
    throw Error('No token found');
  }
  try {
    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(token, 'DellvelopersSecret');
    // Retorna o ID do usuário contido no token
    return decoded.user;
  } catch (err) {
    throw Error('Invalid token');
  }
};

module.exports = {
  // Função para criar um novo favorito por meio de uma operação POST 
  create: async (req, res) => {
    try {
      const favorite = await Favorite.create(req.body).fetch();
      return res.json(favorite);
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Função para listar todos os favoritos do usuário autenticado por meio de uma operação GET
  listFavorites: async (req, res) => {
    try {
      const userAuthData = verifyToken(req);
      const user = await sails.models.user.findOne({ id: userAuthData });
       // Busca todos os favoritos associados ao usuário autenticado
      const favorites = await Favorite.find({ id_associatedUser: user.id });

      return res.json(favorites);
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Função para adicionar ou remover um favorito de um "handbook" usando as operações POST e DELETE
  favoriteHandbook: async (req, res) => {
    try {
      const { handbookId } = req.body;
      const userAuthData = verifyToken(req);
      const user = await sails.models.user.findOne({ id: userAuthData });
      // Verifica se o favorito já existe
      const favoriteExists = await Favorite.findOne({
        id_associatedUser: user.id,
        id_associatedHandbook: handbookId,
      });

      if (favoriteExists) {
         // Se o favorito existir, remove-o
        await Favorite.destroy({
          id_associatedUser: user.id,
          id_associatedHandbook: handbookId,
        });
        // Retorna uma mensagem indicando que o favorito foi removido
        return res.json({ message: 'Favorite removed', favorite: false });
      }
      const favorite = await Favorite.create({
        id_associatedUser: user.id,
        id_associatedHandbook: handbookId,
      }).fetch();
      return res.json({
        message: 'Favorite added',
        favorite: true,
        favoriteId: favorite.id,
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
};
