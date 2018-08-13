/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Egor Zuev <zyev.egor@gmail.com>
 */

const AbstractNetwork = require('../../abstract/btc/AbstractNetwork');

class BTG extends AbstractNetwork {

  constructor() {
    super({
      type: 'btg',
      addressPrefix: {
        pubkeyhash: 0x00,
        scripthash: 0x05,
        witnesspubkeyhash: 0x06,
        witnessscripthash: 0x0a,
        bech32: 'bc'
      }
    });

  }

}

module.exports = new BTG();
