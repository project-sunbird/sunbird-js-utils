const log4js = require('log4js');
const fs = require('fs');
let loggerInit = false;
let config;

const init = (newConfig) => {
    const defaultConfig = {
        path: '../logs',
        enableLogger: true,
        logLevel: 'error'
    }
    config = { ...defaultConfig, ...newConfig }
    if (config.path && !fs.existsSync(config.path)) {
        fs.mkdirSync(config.path)
    }
    
    log4js.configure({
        appenders: {
            console: {
                'type': 'console'
            },
            logs: {
                'type': 'file',
                'maxLogSize': 26214400,
                'filename': `${config.path}/microserviceLogs.log`
            }
        },
        categories: {
            default: { appenders: ['console', 'logs'], level: config.logLevel }
        }
    });

    loggerInit = true;
}

var processRequestObject = (request) => {
    if (request) {
        return {
            id: request.id,
            path: request.route.path,
            method: request.method
        }
    } else {
        return {}
    }
}

const logger = log4js.getLogger('api');

var info = function (data, request) {
    if (loggerInit && config.enableLogger) {
        logger.info(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var debug = function (data, request) {
    if (loggerInit && config.enableLogger) {
        logger.debug(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var fatal = function (data, request) {
    if (loggerInit && config.enableLogger) {
        logger.fatal(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var mark = function (data, request) {
    if (loggerInit && config.enableLogger) {
        logger.mark(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var error = function (data, request) {
    if (loggerInit && config.enableLogger) {
        logger.error(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var warn = function (data, request) {
    if (loggerInit && config.enableLogger) {
        logger.warn(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var trace = function (data, request) {
    if (loggerInit && config.enableLogger) {
        logger.trace(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

module.exports = {
    info, error, warn, trace, debug, mark, fatal, logger, init
}
