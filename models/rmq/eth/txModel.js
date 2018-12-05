const AbstractModel = require('../../../abstract/universal/models/rmq/AbstractModel'),
  Joi = require('joi');

class TxModel extends AbstractModel {


  constructor (obj) {
    super(obj);
    this._schema = Joi.object().keys({
      hash: Joi.string().length(66).required(),
      blockNumber: Joi.number().integer().required(),
      blockHash: Joi.string().length(66).required(),
      transactionIndex: Joi.number().integer().required(),
      from: Joi.string().length(42),
      to: Joi.string().length(42),
      gas: Joi.string().required(),
      gasPrice: Joi.string().required(),
      gasUsed: Joi.string().required(),
      logs: Joi.array().items(
        Joi.object({
          blockNumber: Joi.number().integer().required(),
          address: Joi.string().length(42),
          signature: Joi.string(),
          args: Joi.array(),
          dataIndexStart: Joi.number().integer(),
          hash: Joi.string(),
          index: Joi.number().integer(),
          txIndex: Joi.number().integer(),
          removed: Joi.number().integer()
        })
      ),
      nonce: Joi.number().integer().required(),
      value: Joi.string().required()


    });

    const {error, value} = this._schema.validate(obj);

    if (error)
      throw Error(error);

    Object.assign(this, value);

  }

  static web3ObjToModel (tx, receipt) {

    if (tx.from)
      tx.from = tx.from.toLowerCase();

    if (tx.to)
      tx.to = tx.to.toLowerCase();

    if (tx.gas)
      tx.gas = tx.gas.toString();

    if (tx.input === '0x') {
      tx.gasUsed = '21000';
    } else {
      tx.gasUsed = receipt.gasUsed.toString();
    }

    return new TxModel(tx).toObject();

  }

}


module.exports = TxModel;