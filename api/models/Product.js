/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    pid : { type: 'string' },

    name : { type: 'string' },

    price : { type: 'float' },

    productImageUrl : { type: 'string' }
  }
};

