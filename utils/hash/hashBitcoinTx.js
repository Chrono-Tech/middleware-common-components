/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
const bitcoin = require('bitcoinjs-lib');
module.exports = (txRaw) => {
  const tx = bitcoin.Transaction.fromHex(txRaw);
  return tx.getId();
};
