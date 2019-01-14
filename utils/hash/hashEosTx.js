/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
const createHash = require('create-hash');
module.exports = (txRaw) => {
  const b = new Buffer(txRaw.serializedTransaction);
  return createHash('sha256').update(b).digest().toString('hex')
};
