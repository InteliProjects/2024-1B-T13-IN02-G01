// /* eslint-disable linebreak-style */
/**
 * ViewController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
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
  // Verifica o token de autenticação
  isAuthorizedPage: async (req, res) => {
    try {
      const userAuthData = verifyToken(req);
      const user = await sails.models.user.findOne({ id: userAuthData });
      return res.view(`pages${req.url}`, { user });
    } catch (err) {
      return res.redirect(`/login?redirect=${req.url}`);
    }
  },

  home: async (req, res) => {
    try {
      const userAuthData = verifyToken(req);
      const user = await sails.models.user.findOne({ id: userAuthData }); // Busca o usuário autenticado pelo ID
      // Verifica o nível de acesso do usuário
      if (user.accessLevel !== 'adm' && user.accessLevel !== '2') {
        return res.view('pages/meuProgresso', { user });
      }

      return res.view('pages/admin', { user });
    } catch (err) {
      return res.view('pages/login', {
        user: null,
        layout: 'layouts/no-nav',
      });
    }
  },

  isPublicPage: async (req, res) => {
    try {
      // Verifica o token de autenticação
      const userAuthData = verifyToken(req); 
      const user = await sails.models.user.findOne({ id: userAuthData });

      return res.view(`pages${req.url}`, { user });
    } catch (err) {
      return res.view(`pages${req.url}`, { user: null });
    }
  },

  isAdminPage: async (req, res) => {
    try {
      const userAuthData = verifyToken(req);
      const user = await sails.models.user.findOne({ id: userAuthData });
      // Verifica o nível de acesso do usuário
      if (user.accessLevel !== 'adm' && user.accessLevel !== '2') {
        return res.view('404', { user });
      }

      return res.view(`pages${req.url}`, { user });
    } catch (err) {
      return res.redirect(`/login?redirect=${req.url}`);
    }
  },
};
