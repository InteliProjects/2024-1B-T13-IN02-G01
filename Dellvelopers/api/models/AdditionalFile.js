/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/*
 * AdditionalFiles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'additionalFile',
  attributes: {
    typeOfFile: {
      type: 'string',
      required: true,
    },
    filesPath: {
      type: 'string',
      required: true,
    },

    //foreing keys
    id_associatedHandbook: {
      model: 'handbook',
      required: true,
    },
  },
};
