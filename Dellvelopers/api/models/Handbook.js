/* eslint-disable linebreak-style */
/**
 * Handbooks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'handbook',
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    uploadDate: {
      type: 'string',
      required: true,
    },
    publicationDate: {
      type: 'string',
      required: true,
    },
    productName: {
      type: 'string',
      required: true,
    },
    images: {
      type: 'string',
      required: true,
    },

    //foreing keys
    id_associatedFavorite: {
      collection: 'favorite',
      via: 'id_associatedHandbook',
    },
    id_additionalFile: {
      collection: 'additionalFile',
      via: 'id_associatedHandbook',
    },

    id_associatedAssembleLine: {
      model: 'assembleLine',
    },
    tasks: {
      collection: 'task',
      via: 'id_associatedHandbook',
    },
  },
};
