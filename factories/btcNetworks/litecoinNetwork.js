/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Egor Zuev <zyev.egor@gmail.com>
 */

const Address = require('bcoin/lib/primitives/address'),
  AbstractNetwork = require('../../abstract/btc/AbstractNetwork');

class LITECOIN extends AbstractNetwork {

  constructor() {

    const settings = {
      new: {
        type: 'litecoin',
        addressPrefix: {
          pubkeyhash: 0x30,
          scripthash: 0x32,
          witnesspubkeyhash: 0x06,
          witnessscripthash: 0x0a,
          bech32: 'lc'
        }
      },
      legacy: {
        type: 'litecoin',
        addressPrefix: {
          pubkeyhash: 0x30,
          scripthash: 0x05,
          witnesspubkeyhash: 0x06,
          witnessscripthash: 0x0a,
          bech32: 'lc'
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

module.exports = new LITECOIN();
