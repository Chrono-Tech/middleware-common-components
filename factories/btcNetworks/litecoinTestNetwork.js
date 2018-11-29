/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Egor Zuev <zyev.egor@gmail.com>
 */

const Address = require('bcoin/lib/primitives/address'),
  AbstractNetwork = require('../../abstract/btc/AbstractNetwork');

class LITECOINTEST extends AbstractNetwork {

  constructor() {

    const settings = {
      new: {
        type: 'litecointest',
        addressPrefix: {
          pubkeyhash: 0x6f,
          scripthash: 0xc4, //196 - legacy
          witnesspubkeyhash: 0x03,
          witnessscripthash: 0x28,
          bech32: 'tb'
        }
      },
      legacy: {
        type: 'litecointest',
        addressPrefix: {
          pubkeyhash: 0x6f,
          scripthash: 0x3a, //58 - new
          witnesspubkeyhash: 0x03,
          witnessscripthash: 0x28,
          bech32: 'tb'
        }
      }
    };


    super(settings.legacy);
    this.settings = settings;
  }


  getAllAddressForms(address) {
    const types = {
      legacy: address,
      new: null
    };

    try {
      types.legacy = Address.fromString(address).toString(this);
      types.new = Address.fromString(address).toString(new AbstractNetwork(this.settings.new));

      return types;
    } catch (e) {
      return types;
    }
  }


}

module.exports = new LITECOINTEST();
