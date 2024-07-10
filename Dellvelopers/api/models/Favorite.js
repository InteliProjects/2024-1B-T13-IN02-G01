/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/**
 * Favorites.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'favorite',
  attributes: {
    //foreing keys
    id_associatedHandbook: {
      model: 'handbook',
    },
    id_associatedUser: {
      model: 'user',
    },
  },
};
