const uuidV1 = require('uuid/v1')

/**
 * this function create success response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.successResponse.response}
 */
function successResponse (data) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgid, 'successful', null, null)
  response.responseCode = data.responseCode || 'OK'
  response.result = data.result

  return response
}

/**
 * this function create error response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.errorResponse.response}
 */
function errorResponse (data) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgId, 'failed', data.errCode, data.errMsg)
  response.responseCode = data.responseCode
  response.result = data.result

  return response
}

/**
 * this function helps to create params for error and success response function.
 * @param {String} msgId
 * @param {String} status
 * @param {String} errCode
 * @param {String} msg
 * @returns {nm$_responseUtil.getParams.params}
 */
function getParams (msgId, status, errCode, msg) {
  var params = {}
  params.resmsgid = uuidV1()
  params.msgid = msgId || null
  params.status = status
  params.err = errCode
  params.errmsg = msg

  return params
}

/**
 * Exports required module
 */
module.exports.successResponse = successResponse
module.exports.errorResponse = errorResponse
