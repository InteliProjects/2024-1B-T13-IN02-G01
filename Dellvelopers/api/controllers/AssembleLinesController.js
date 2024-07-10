/* eslint-disable linebreak-style */
/**
 * AssembleLinesController
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
  // Função para criar uma nova linha de montagem por meio de uma operação POST
  create: async function (req, res) {
    try {
      const { name, description, productType, id_associatedUser } = req.body;

      // Cria uma nova linha de montagem
      const newAssembleLine = await AssembleLine.create({
        name,
        description,
        productType,
      }).fetch();

      // Atualiza cada usuário selecionado com o novo ID da linha de montagem
      await User.update({ id: id_associatedUser }).set({
        id_associatedAssembleLine: newAssembleLine.id,
      });

      // Retorna a nova linha de montagem com status 201 (criado)
      return res.json({ success: true, data: newAssembleLine });
    } catch (err) {
      // Em caso de erro, retorna um status 500 (erro interno do servidor) com a mensagem de erro
      return res.status(500).json({ error: err.message });
    }
  },
  // // Função de atualizar uma linha de montagem por meio de uma operação POST
  updatedAssembleLines: async function (req, res) {
    try {
      const { name, description, productType, id_associatedUserArray } =
        req.body;
      // Atualiza a linha de montagem
      const updatedAssembleLine = await AssembleLine.update({
        id: req.params.id,
      })
        .set({
          name,
          description,
          productType,
        })
        .fetch();

      const usuariosAtualizados = [];

      // Atualiza cada usuário selecionado com o novo ID da linha de montagem

      for (const idUsuario of id_associatedUserArray) {
        const usuarioAtualizado = await User.updateOne({ id: idUsuario }).set({
          id_associatedAssembleLine: parseInt(req.params.id),
        });

        usuariosAtualizados.push(usuarioAtualizado);
      }

      // Retorna a linha de montagem atualizada com status 200 (OK)
      return res.json({
        success: true,
        data: updatedAssembleLine,
        usuariosAtualizados,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Função para deletar uma linha de montagem
  delete: async function (req, res) {
    try {
      const id = req.params.id;

      // Deleta a linha de montagem pelo ID
      await AssembleLine.destroy({ id: id });

      // Retorna um status 200 (OK) indicando sucesso
      return res.ok();
    } catch (err) {
      // Em caso de erro, retorna um status 500 (erro interno do servidor) com a mensagem de erro
      return res.serverError(err);
    }
  },

  // Função para listar todas as linhas de montagem
  list: async (req, res) => {
    try {
      // Obtém todas as linhas de montagem
      const AssembleLines = await AssembleLine.find();

      // Retorna a lista de linhas de montagem
      return res.json(AssembleLines);
    } catch (err) {
      // Em caso de erro, retorna um status 500 (erro interno do servidor) com a mensagem de erro
      return res.serverError(err);
    }
  },

  // Função para executar consultas específicas
  getQuery: async (req, res) => {
    try {
      // Consulta para obter linhas de montagem associadas a tarefas concluídas
      const queryProgressoFeito = `
    SELECT "id_associatedAssembleLine" 
    FROM handbook 
    INNER JOIN task 
    ON task."id_associatedHandbook" = handbook.id  
    WHERE task."isFinished" = TRUE`;

      // Consulta para obter linhas de montagem associadas a tarefas pendentes
      const queryProgressoPendente = `
    SELECT "id_associatedAssembleLine" 
    FROM handbook 
    INNER JOIN task 
    ON task."id_associatedHandbook" = handbook.id  
    WHERE task."isFinished" = FALSE`;

      // Consulta para obter nomes de produtos associados a linhas de montagem
      const queryProduct = `
    SELECT "productName"
    FROM handbook
    INNER JOIN "assembleLine"
    ON handbook."id_associatedAssembleLine"  = "assembleLine".id`;

      // Executa as consultas SQL nativas
      const rawResultFeito = await sails.sendNativeQuery(queryProgressoFeito);
      const rawResultPendente = await sails.sendNativeQuery(
        queryProgressoPendente
      );
      const rawResultProduct = await sails.sendNativeQuery(queryProduct);

      // Loga os resultados das consultas
      sails.log(rawResultFeito);
      sails.log(rawResultPendente);
      sails.log(rawResultProduct);
    } catch (error) {
      // Em caso de erro, loga o erro e lança uma nova exceção com a mensagem de erro
      sails.log.error('Erro ao buscar query:', error);
      throw new Error(`Erro ao buscar query: ${error.message}`);
    }
  },
  // Função para buscar uma AssembleLine especifica, ou seja, ao invés de chamar a lista, irá chamar somente uma.
  findOne: async (req, res) => {
    try {
      // Busca um documento na coleção AssembleLine que tenha o id especificado nos parâmetros da requisição
      const assembleLineSelected = await AssembleLine.findOne({
        id: req.params.id,
      });
      if (!assembleLineSelected) {
        return res.notFound();
      }
      // Verifica o token de autenticação do usuário a partir da requisição
      const userAuthData = verifyToken(req);
      // Busca os dados do usuário autenticado na coleção User
      const userRequest = await sails.models.user.findOne({ id: userAuthData });

      if (
        userRequest.accessLevel !== 'adm' &&
        userRequest.accessLevel !== '2'
      ) {
        return res.view('404', { userRequest });
      }
      // Retorna a página de edição de AssembleLine com os dados do usuário e da linha de montagem selecionada
      return res.view('pages/editarAssembleLine', {
        user: userRequest,
        assembleLine: assembleLineSelected,
      });

      // return res.json(user);
    } catch (err) {
      return res.notFound();
    }
  },
};
