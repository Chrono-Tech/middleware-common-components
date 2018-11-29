/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Egor Zuev <zyev.egor@gmail.com>
 */

const AbstractNetwork = require('../../abstract/btc/AbstractNetwork'),
  bcc = require('bchaddrjs');


class BCCTEST extends AbstractNetwork {

  constructor () {
    super({
      type: 'bcctest',
      addressPrefix: {
        pubkeyhash: 0x6f,
        scripthash: 0xc4,
        witnesspubkeyhash: 0x03,
        witnessscripthash: 0x28,
        bech32: 'tb'
      }
    });
  }

  getAllAddressForms (address) {
    const types = {
      new: null,
      legacy: address,
      bitpay: null
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

module.exports = new BCCTEST();
