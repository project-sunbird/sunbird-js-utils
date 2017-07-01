/*
 * @file: index.js
 * @author: Anuj Gupta
 * @desc: using log4s, enables application wide logging.
 */
var log4js = require('log4js');
var path = require('path');
var fs = require('fs');
var dir = '../../log';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var logdir = path.join(__dirname, '../../');
var logconfig = require('./log4js.json', { cwd: logdir });
log4js.configure(logconfig);
var logger = log4js.getLogger('api');

var info = function (data) {
    logger.setLevel('INFO');
    logger.info(JSON.stringify(data));
};

var error = function (data) {
    logger.setLevel('ERROR');
    logger.error(JSON.stringify(data));
};

var warn = function (data) {
    logger.setLevel('WARN');
    logger.warn(JSON.stringify(data));
};

var trace = function (data) {
    logger.setLevel('TRACE');
    logger.trace(JSON.stringify(data));
};

module.exports.info = info;
module.exports.error = error;
module.exports.warn = warn;
module.exports.trace = trace;