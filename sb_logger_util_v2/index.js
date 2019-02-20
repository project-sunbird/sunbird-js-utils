const log4js = require('log4js');
const mkdirp = require('mkdirp');
const path = require('path');
let loggerInitialized = false;
let config;

const init = (appConfig) => {
    const defaultConfig = {
        path: './logs/microservice.log',
        logLevel: 'error'
    }
    config = { ...defaultConfig, ...appConfig }
    if (config.path) {
        mkdirp.sync(path.dirname(config.path));
    }

    log4js.configure({
        appenders: {
            console: {
                'type': 'console'
            },
            logs: {
                'type': 'file',
                'maxLogSize': 26214400,
                'filename': `${config.path}`
            }
        },
        categories: {
            default: { appenders: ['console', 'logs'], level: config.logLevel }
        }
    });
    loggerInitialized = true;
}

var processRequestObject = request => (request && request.id) ? { id: request.id } : {};

const logger = log4js.getLogger('api');

var info = function (data, request) {
    if (loggerInitialized) {
        logger.info(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var debug = function (data, request) {
    if (loggerInitialized) {
        logger.debug(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var fatal = function (data, request) {
    if (loggerInitialized) {
        logger.fatal(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var mark = function (data, request) {
    if (loggerInitialized) {
        logger.mark(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var error = function (data, request) {
    if (loggerInitialized) {
        logger.error(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var warn = function (data, request) {
    if (loggerInitialized) {
        logger.warn(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var trace = function (data, request) {
    if (loggerInitialized) {
        logger.trace(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

module.exports = {
    info, error, warn, trace, debug, mark, fatal, logger, init
}
