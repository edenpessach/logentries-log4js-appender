'use strict';
var Logger = require('le_node');
var levels = require('log4js').levels;
var logger = null;

/**
 *
 * @param config
 * @param layouts
 * @returns {*}
 */
exports.configure = (config, layouts) => {
    var options = config.options;
    var passThrough = layouts.messagePassThroughLayout;

    if (typeof (options.token) === 'string') {
        logger = new Logger({token: options.token});
    } else {
        console.error('ERROR: logentries appender expected token but did not get one'); // todo: how to properly propagate? throwing exception does not work nicely.
        return null;
    }

    var layout;
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    } else {
        layout = passThrough;
    }

    return exports.appender(config, layout);
};

exports.appender = (config, layout) => {
    return function (event) {
        var msg = layout(event);

        if (logger === null) {
            return;
        }

        if (event.level === levels.FATAL) {
            logger.fatal(msg);
        }

        if (event.level === levels.ERROR) {
            logger.error(msg);
        }

        if (event.level === levels.WARN) {
            logger.warn(msg);
        }

        if (event.level === levels.INFO) {
            logger.info(msg);
        }

        if (event.level === levels.DEBUG) {
            logger.debug(msg);
        }

        if (event.level === levels.TRACE) {
            logger.trace(msg);
        }
    };
};

exports.name = 'logentries';