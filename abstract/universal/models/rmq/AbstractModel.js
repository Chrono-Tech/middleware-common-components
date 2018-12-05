const _ = require('lodash');

class AbstractModel {

  constructor (obj) {
    this._obj = obj;
  }

  toString () {
    let obj = this.toObject();
    return JSON.stringify(obj);
  }

  toObject () {
    return _.chain(this)
      .toPairs()
      .filter(pair => pair[0].indexOf('_') !== 0)
      .fromPairs()
      .value();
  }

}


module.exports = AbstractModel;