/**
 * author: Anuj Gupta
 * Date: 12-01-2018
 * desc: This class is responsible for storing the telemetry data locally till some limit
         once limit is crossed or END event is triggered, called the api to store the data
 */

var request = require('request')
var _ = require('lodash');
var telemetryBatchUtil = require('./telemetryBatchUtil');

function telemetrySyncManager() {

}

/**
 * config have properties : ['headers', 'batchsize', 'host', 'endpoint', 'authtoken', 'method']
 */

/**
  initialize the telemetry data to store event, and set configuration
  */
telemetrySyncManager.prototype.init = function (config) {
  this.config = config
  this.teleData = []
  this.failedList = []
  var self = this;
  setInterval(function () {
    if (telemetryBatchUtil.get()) {
      self.sync(function(){});
    }
  }, 5000)
}

/**
 * desc: Responsible for store data and call sync
 */
telemetrySyncManager.prototype.dispatch = function (telemetryEvent) {
  this.teleData.push(telemetryEvent)
  if ((telemetryEvent.eid.toUpperCase() == 'END') || (this.teleData.length >= this.config.batchsize)) {
    telemetryBatchUtil.add(this.teleData.splice(0, this.config.batchsize))
  }
}

/**
 * Resposible for return http headers for telemetry sync api
 */
telemetrySyncManager.prototype.getHttpHeaders = function () {
  var headersParam = {}

  // If user not sending the headers, we adding authtoken and content-type default,
  // in this user should send authtoken
  if (!this.config.headers) {
    if (typeof this.config.authtoken !== 'undefined') { headersParam['Authorization'] = this.config.authtoken }
    headersParam['Content-Type'] = 'application/json'
  } else {
    headersParam = this.headers
  }
  return headersParam
}

/**
 * Resposible for return http option for telemetry sync
 */
telemetrySyncManager.prototype.getHttpOption = function () {
  const headers = this.getHttpHeaders()
  var batch = telemetryBatchUtil.get();
  var telemetryObj = {
    'id': 'ekstep.telemetry',
    'ver': this.config.version || '3.0',
    'ets': Date.now(),
    'events': _.clone(batch.events)
  }
  telemetryBatchUtil.delete(batch.id);
  const apiPath = this.config.host + this.config.endpoint
  return {
    url: apiPath,
    method: this.config.method,
    headers: headers,
    json: true,
    body: telemetryObj
  }
}

/**
 * desc: Responsible for call http api
 */
telemetrySyncManager.prototype.sync = function (callback) {
  if (this.teleData.length > 0) {
    var self = this
    const options = this.getHttpOption()

    request(options, function (err, res, body) {
      if (body && body.params && _.toLower(body.params.status) === 'successful') {
        console.log('Telemetry submitted successfully')
        callback(null, body)
      } else if (_.get(body, 'params.err') === 'VALIDATION_ERROR') {
        callback(null, body)
      } else {
        telemetryBatchUtil.add(options.body.events)
        console.log('Telemetry sync failed, due to ', err, body.params)
        callback(err, null)
      }
    })
  } else {
    callback(null, true)
  }
}

module.exports = telemetrySyncManager
