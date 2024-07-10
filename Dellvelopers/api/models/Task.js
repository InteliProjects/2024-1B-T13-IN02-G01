/* eslint-disable linebreak-style */
/**
 * Tasks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'task',
  attributes: {
    isFinished: {
      type: 'boolean',
      required: true,
    },
    uploadDate: {
      type: 'string',
      required: true,
    },
    priority: {
      type: 'string',
      required: true,
    },

    //foreing keys
    id_associatedHandbook: {
      model: 'handbook',
    },
    id_associatedAssembleLine: {
      model: 'assembleLine',
    },
  },
};
