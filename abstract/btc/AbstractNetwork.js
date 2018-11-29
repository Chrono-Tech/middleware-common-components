const Network = require('bcoin/lib/protocol/network'),
  networks = require('bcoin/lib/protocol/networks');

class AbstractNetwork extends Network {

  constructor(options) {
    delete Network[options.type];
    options.deploys = [];
    options.checkpointMap = [];
    super(options);
    networks[options.type] = options;
  }

  getAllAddressForms(address) {
    return {
      legacy: address,
      new: null
    };
  }

}


module.exports = AbstractNetwork;