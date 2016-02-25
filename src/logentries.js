'use strict';

var layouts = require('log4js').layouts;
var Logger = require('le_node');
var logger = null;
var passThrough = layouts.messagePassThroughLayout;

/**
 *
 *      debug
 *      info
 *      notice
 *      warning
 *      err
 *      crit
 *      alert
 *      emerg
 **/

/**
 *     OFF      nothing is logged
 *     FATAL    fatal errors are logged
 *     ERROR    errors are logged
 *     WARN     warnings are logged
 *     INFO     infos are logged
 *     DEBUG    debug infos are logged
 *     TRACE    traces are logged
 *     ALL
 **/
/**
 *
 * @param config
 * @returns {*}
 */

exports.configure = (config) => {
    var options = config.options;
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

        if (event.level.levelStr === 'FATAL') {
            logger.crit(msg);
        }

        if (event.level.levelStr === 'ERROR') {
            logger.err(msg);
        }

        if (event.level.levelStr === 'WARN') {
            logger.warning(msg);
        }

        if (event.level.levelStr === 'INFO') {
            logger.info(msg);
        }

        if (event.level.levelStr === 'DEBUG') {
            logger.debug(msg);
        }

        if (event.level.levelStr === 'TRACE') {
            logger.debug(msg);
        }
    };
};

exports.name = 'logentries';
