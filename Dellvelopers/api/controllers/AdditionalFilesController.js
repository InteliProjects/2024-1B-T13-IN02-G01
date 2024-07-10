/* eslint-disable linebreak-style */
/**
 * AdditionalFilesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  // No seguinte código, temos a função create que realiza uma operação POST para adicionar as AdditionalFiles
  create: async (req, res) => {
    try {
      const additionalFile = await AdditionalFile.create(req.body).fetch();
      return res.json(additionalFile);
    } catch (err) {
      return res.serverError(err);
    }
  },
  // No seguinte código, temos a função list que realiza uma operação GET para obter as informações de AdditionalFiles
  list: async (req, res) => {
    try {
      const additionalFiles = await AdditionalFile.find();
      return res.json(additionalFiles);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
