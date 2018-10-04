const uniqid = require('uniqid'),
  sem = require('semaphore')(1),
  bunyan = require('bunyan'),
  Promise = require('bluebird'),
  log = bunyan.createLogger({name: 'app.services.providerService'}),
  EventEmitter = require('events');

/**
 * @class
 * @description abstract provider class, for all modules, which have dependencies from node
 * @type {AbstractProvider}
 */

module.exports = class AbstractProvider {

  constructor() {
    if (new.target === AbstractProvider) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }

    this.events = new EventEmitter();
    this.connector = null;
    this.id = uniqid();
  }


  /**
   * @function
   * @description set rabbitmqChannel
   * @param rabbitmqChannel the created channel for rmq
   * @param rabbitServiceName the prefix for all queues
   * @return {Promise<void>}
   */
  async setRabbitmqChannel(rabbitmqChannel, rabbitServiceName) {
    this.rabbitmqChannel = rabbitmqChannel;
    this.rabbitServiceName = rabbitServiceName;
    await rabbitmqChannel.assertQueue(`${this.rabbitServiceName}_provider.${this.id}`, {autoDelete: true});
    await rabbitmqChannel.bindQueue(`${this.rabbitServiceName}_provider.${this.id}`, 'internal', `${this.rabbitServiceName}_current_provider.set`);
    this._startListenProviderUpdates();
  }

  /**
   * @function
   * @description start listen for provider updates from block processor
   * @return {Promise<void>}
   * @private
   */
  _startListenProviderUpdates() {
    throw new Error('method should be overriden');
  }

  /**
   * @function
   * @description choose the connector
   * @return {Promise<null|*>}
   */
  async switchConnector() {

    await new Promise(res => {
      this.events.once('provider_set', res);

      if (this.rabbitServiceName)
        this.rabbitmqChannel.publish('internal', `${this.rabbitServiceName}_current_provider.get`, new Buffer(JSON.stringify({id: this.id})));

    }).timeout(10000).catch(() => {
      log.error('provider hasn\'t been chosen');
      process.exit(0);
    });

    return this.connector;
  }


  /**
   * @function
   * @description safe connector switching, by moving requests to
   * @return {Promise<bluebird>}
   */
  async switchConnectorSafe () {
    return new Promise(res => {
      sem.take(async () => {
        if (!this.connector)
          await this.switchConnector();
        res(this.connector);
        sem.leave();
      });
    });
  }

  /**
   * @function
   * @description
   * @return {Promise<*|bluebird>}
   */
  async get() {
    return this.connector || await this.switchConnectorSafe();
  }

}