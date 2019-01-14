/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
const nemDeserializeTx = require('./nemDeserializeTx'),
	nemHash = require('./nemHash');

module.exports = async (txRaw) => {
	const txData = JSON.parse(txRaw).data;
	const tx = nemDeserializeTx.parse(txData); 
	return nemHash.calculateTransactionHash(tx);
};
