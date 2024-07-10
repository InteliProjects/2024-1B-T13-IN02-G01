/* eslint-disable linebreak-style */
/**
 * AssembleLine.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'assembleLine',
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    productType: {
      type: 'string',
      required: true,
    },
    //foreing keys
    users: {
      collection: 'user',
      via: 'id_associatedAssembleLine',
    },
    handbooks: {
      collection: 'handbook',
      via: 'id_associatedAssembleLine',
    },

    tasks: {
      collection: 'task',
      via: 'id_associatedAssembleLine',
    },
  },
};
