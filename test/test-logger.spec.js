
var log4js = require('log4js');


process.env.NODE_PATH = '../src';
require('module').Module._initPaths();

log4js.configure({
 'appenders': [
    { 'type': 'logentries', 'options': { 'token' : process.env.LOGENTRIES_TOKEN } }
]
});

var logger = log4js.getLogger('hello');
logger.info('i am here','and','so','am','i');
