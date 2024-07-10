const sinon = require('sinon');

const mockAsync = (model, module, result = null) => {
  return sinon.stub(model, module).resolves(result); //'mockAsync' cria um stub com o sinon (biblioteca)
};

const RESPONSE = {
  //'RESPONSE' é uma resposta http simulada, e em formato json.
  json: function (data) {
    return data;
  },
};
const FAVORITE = {
  //objeto que eu crio para fazer os testes. Os valores são dados pelo desenvolvedor.
  id_associatedHandbook: 3,
  id_associatedUser: 3,
};

module.exports = {
  mockAsync,
  RESPONSE,
  FAVORITE, //cria um stub para a resposta
};
