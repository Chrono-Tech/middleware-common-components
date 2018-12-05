const AbstractModel = require('../../../abstract/universal/models/rmq/AbstractModel'),
  Joi = require('joi');

class BlockModel extends AbstractModel {

  constructor (obj) {
    super(obj);
    this._schema = Joi.object().keys({
      block: Joi.number().integer().required()
    });

    const {error, value} = this._schema.validate(obj);

    if(error)
      throw Error(error);

    Object.assign(this, value);

  }


}


module.exports = BlockModel;