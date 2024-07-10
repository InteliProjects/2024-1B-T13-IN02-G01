/* eslint-disable linebreak-style */
/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'user',
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    gender: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    accessLevel: {
      type: 'string',
      required: true,
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },
    // foreing keys

    id_associatedAssembleLine: {
      model: 'assembleLine',
      required: true,
    },
    favorites: {
      collection: 'favorite',
      via: 'id_associatedUser',
    },
  },
};
