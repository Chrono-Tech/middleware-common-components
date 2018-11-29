/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Egor Zuev <zyev.egor@gmail.com>
 */

const AbstractNetwork = require('../../abstract/btc/AbstractNetwork'),
  bcc = require('bchaddrjs');

class BCC extends AbstractNetwork {

  constructor() {
    super({
      type: 'bcc',
      addressPrefix: {
        pubkeyhash: 0x00,
        scripthash: 0x05,
        witnesspubkeyhash: 0x06,
        witnessscripthash: 0x0a,
        bech32: 'bc'
      }
    });

  }

  getAllAddressForms(address) {
    const types = {
      bitpay: null,
      new: null,
      legacy: address
    };

    try {
      types.new = bcc.toCashAddress(address);
      types.legacy = bcc.toLegacyAddress(address);
      types.bitpay = bcc.toBitpayAddress(address);

      return types;
    } catch (e) {
      return types;
    }
  }

}

module.exports = new BCC();
