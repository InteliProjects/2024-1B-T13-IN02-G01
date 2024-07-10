// /* eslint-disable linebreak-style */
/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//
const bcrypt = require('bcrypt');
//
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
  // Busca todos os usuários no banco de dados
  list: async function (req, res) {
    try {
      const users = await User.find();

      const arrayUsers = Object.keys(users).map((key) => users[key]);

      const usersWithoutPassword = arrayUsers.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return res.json(usersWithoutPassword);
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Define uma consulta SQL para buscar dados de usuários e linhas de montagem associadas
  userlist: async (req, res) => {
    try {
      const userFilter = `  SELECT 
      "user".id, 
      "user".name AS username, 
      "user".email, 
      "user"."accessLevel", 
      "user"."isActive",
      "assembleLine"."name" AS assembleLineName 
      FROM 
          "user" 
      LEFT JOIN 
          public."assembleLine" 
      ON 
          "user"."id_associatedAssembleLine" = "assembleLine".id `;

      const unfinished = await User.getDatastore().sendNativeQuery(userFilter);
      // Log the result for debugging
      sails.log('unfinished', unfinished);

      // Transform the result to only include necessary fields
      const users = unfinished.rows.map((row) => ({
        id: row.id,
        name: row.username, // Adjusted to use userName
        email: row.email,
        accessLevel: row.accessLevel,
        assembleLineName: row.assemblelinename,
        isActive: row.isActive,
      }));

      return res.json(users); // Return the formatted result
    } catch (err) {
      sails.log.error(err); // Log the error for debugging
      return res.serverError(err);
    }
  },
  viewAddUserPage: async (req, res) => {
    try {
      const token = req.cookies.token;
      const userAuthData = jwt.verify(token, 'DellvelopersSecret');

      const user = await sails.models.user.findOne({ id: userAuthData.user });

      if (!(user.accessLevel === '3') && !(user.accessLevel === '2')) {
        return res.notFound();
      }

      return res.view('pages/addUser');
    } catch (err) {
      return res.redirect('/login?redirect=/addUser');
    }
  },
  // Busca um usuário específico pelo ID, por meio de um método POST:id
  findOne: async (req, res) => {
    try {
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
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

      return res.view('pages/editarFuncionario', {
        user: userRequest,
        editUser: user,
      });
    } catch (err) {
      return res.notFound();
    }
  },
//Cria novos usuários por meio de um método POST
  create: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        gender,
        accessLevel,
        id_associatedAssembleLine,
      } = req.body;

      // Verifica se todos os campos obrigatórios foram fornecidos
      if (
        !name ||
        !email ||
        !password ||
        !gender ||
        !accessLevel ||
        !id_associatedAssembleLine
      ) {
        return res.status(400).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos.',
        });
      }

      const doesUserExist = await User.findOne({ email });
      if (doesUserExist) {
        return res
          .status(400)
          .json({ error: 'O e-mail fornecido já está em uso.' });
      }

      // Criptografa a senha fornecida antes de armazená-la no banco de dados
      const newPassword = await bcrypt.hash(password, 10);

      // Cria um novo usuário no banco de dados com os dados fornecidos e a senha criptografada
      const user = await User.create({
        name,
        email,
        password: newPassword,
        gender,
        accessLevel,
        id_associatedAssembleLine, // Certifique-se de que id_associatedAssembleLine está definido corretamente aqui
      }).fetch();

      // Retorna as informações do usuário criado
      return res.json(user);
    } catch (err) {
      // Retorna um erro de servidor caso ocorra algum problema durante a criação do usuário
      console.error('Erro ao criar usuário:', err);
      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  },

  updateUser: async (req, res) => {
    try {
      // Atualiza o usuário pelo ID com os dados do corpo da requisição

      let data = Object.entries(req.body)
        .filter(([key, value]) => value !== undefined)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      // Verifica se a senha foi fornecida e a criptografa antes de atualizar o usuário

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      const updatedUser = await User.updateOne({ id: req.params.id }).set(data);

      // Retorna os dados atualizados do usuário
      return res.json(updatedUser);
    } catch (err) {
      // Loga e retorna erro em caso de falha
      console.error('Erro ao atualizar usuário:', err);
      return res.badRequest(err);
    }
  },
  // Remove um usuário específico pelo ID, por meio de um metodo DELETE: id
  destroy: async (req, res) => {
    try {
      await User.destroyOne({ id: req.params.id });
      return res.ok();
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Atualiza o campo isActive para false para desativar os usuários fornecidos
  disableUsers: async (req, res) => {
    try {
      const updatedUsers = await User.update({ id: req.body.ids }).set({
        isActive: false,
      });

      return res.ok();
    } catch (err) {
      return res.serverError(err);
    }
  },
  // Atualiza o campo isActive para true para ativar os usuários fornecidos
  enableUsers: async (req, res) => {
    try {
      const updatedUsers = await User.update({ id: req.body.ids }).set({
        isActive: true,
      });
      return res.ok();
    } catch (err) {
      return res.serverError(err);
    }
  },
};
