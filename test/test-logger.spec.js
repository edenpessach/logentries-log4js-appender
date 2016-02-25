var log4js = require('log4js');
var path = require('path');
var expect = require('expect.js');

var srcDir = path.join(__dirname, '../src');
process.env.NODE_PATH = srcDir;
require('module').Module._initPaths();

describe('logentries appender', () => {
    beforeEach(function () {
        expect(process.env.LOGENTRIES_TOKEN).not.to.be(undefined, 'environment variable LOGENTRIES_TOKEN should be defined');
    });

    it('should send messages to logentries', () => {
        log4js.configure({
            appenders: [
                {type: 'logentries', options: {token: process.env.LOGENTRIES_TOKEN}}
            ]
        });

        var logger = log4js.getLogger('hello');
        logger.info('i am here', 'and', 'so', 'am', 'i');
        // just test it works..
    });
});
