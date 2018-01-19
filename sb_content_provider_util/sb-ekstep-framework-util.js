var httpUtil = require('sb-http-util')
var configUtil = require('sb-config-util')

getHttpOptions = function (url, data, method, formData, headers) {
  var defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': configUtil.getConfig('Authorization_TOKEN')
  }

  var http_options = {
    url: url,
    headers: defaultHeaders,
    method: method,
    json: true
  }

  if (headers) {
    headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : defaultHeaders['Content-Type']
    headers['Authorization'] = defaultHeaders['Authorization']
    http_options.headers = headers
  }

  if (data) { http_options.body = data }

  if (formData) { http_options.formData = formData }

  return http_options
}

getChannelValuesById = function (channelId, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('CHANNEL_URI') + '/' + channelId
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

ChannelList = function (data, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('CHANNEL_LIST_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

ChannelSearch = function (data, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('CHANNEL_SEARCH_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

ChannelCreate = function (data, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('CHANNEL_CREATE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

ChannelUpdate = function (data, channelId, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('CHANNEL_UPDATE_URI') + '/' + channelId
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  sendRequest(options, cb)
}

getFrameworkById = function (frameworkId, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_URI') + '/' + frameworkId
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

frameworklList = function (data, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_LIST_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

frameworkCreate = function (data, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_CREATE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

frameworkUpdate = function (data, frameworkId, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_UPDATE_URI') + '/' + frameworkId
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  sendRequest(options, cb)
}

getFrameworkTerm = function (query, category, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_TERM_URI') + '/' + category
  var options = getHttpOptions(url, null, 'GET', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkTermSearch = function (data, query, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_TERM_SEARCH_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkTermCreate = function (data, query, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_TERM_CREATE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkTermUpdate = function (data, query, category, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_TERM_UPDATE_URI') + '/' + category
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

getFrameworkCategoryInstance = function (query, category, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_CATEGORY_INSTANCE_URI') + '/' + category
  var options = getHttpOptions(url, null, 'GET', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkCategoryInstanceSearch = function (data, query, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_CATEGORY_INSTANCE_SEARCH_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkCategoryInstanceCreate = function (data, query, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_CATEGORY_INSTANCE_CREATE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkCategoryInstanceUpdate = function (data, query, category, headers, cb) {
  var url = configUtil.getConfig('BASE_URL') + configUtil.getConfig('FRAMEWORK_CATEGORY_INSTANCE_UPDATE_URI') + '/' + category
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

function sendRequest (http_options, cb) {
  httpUtil.sendRequest(http_options, function (err, resp, body) {
    if (resp && resp.statusCode && body) {
      body.statusCode = resp.statusCode ? resp.statusCode : 500
      cb(null, body)
    } else {
      cb(true, null)
    }
  })
}

module.exports = {
  getChannelValuesById: getChannelValuesById,
  ChannelCreate: ChannelCreate,
  ChannelUpdate: ChannelUpdate,
  ChannelList: ChannelList,
  ChannelSearch: ChannelSearch,
  getFrameworkById: getFrameworkById,
  frameworklList: frameworklList,
  frameworkCreate: frameworkCreate,
  frameworkUpdate: frameworkUpdate,
  getFrameworkTerm: getFrameworkTerm,
  frameworkTermSearch: frameworkTermSearch,
  frameworkTermCreate: frameworkTermCreate,
  frameworkTermUpdate: frameworkTermUpdate,
  getFrameworkCategoryInstance: getFrameworkCategoryInstance,
  frameworkCategoryInstanceSearch: frameworkCategoryInstanceSearch,
  frameworkCategoryInstanceCreate: frameworkCategoryInstanceCreate,
  frameworkCategoryInstanceUpdate: frameworkCategoryInstanceUpdate
}
