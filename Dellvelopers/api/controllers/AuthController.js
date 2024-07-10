/**
 * AuthControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  // Função de autenticação de login
  login: async (req, res) => {
    try {
      // Obtém o email e a senha do corpo da requisição
      const { email, password } = req.body;
      // Busca o usuário no banco de dados pelo email
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      // Compara a senha fornecida com a senha armazenada no banco de dados
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      // Gera um token JWT com o ID do usuário e uma chave secreta, válido por 8 horas
      const token = jwt.sign({ user: user.id }, 'DellvelopersSecret', {
        expiresIn: '8h',
      });
       // Define um cookie com o token, com atributos de segurança
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
      });
      req.session.userId = user.id;
      return res.json({ success: true, accessLevel: user.accessLevel });
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Função de sair da conta e aplicação da qual o usúario está manipulando
  logout: async (req, res) => {
    // Limpa o cookie de token
    res.clearCookie('token');
    req.session.userId = null;
    return res.json({ success: true });
  },
};
