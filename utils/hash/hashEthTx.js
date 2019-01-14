/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
const keccak256 = require('js-sha3').keccak256;
module.exports = (txRaw) => {
    return keccak256(txRaw)'
};
