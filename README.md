# logentries-log4js-appender

### Example of usage
```
var log4js = require("log4js");
 
log4js.configure({
            appenders: {
                 logentries: {
                    type: "logentries-log4js-appender", 
                    options: {
                        token: process.env.LOGENTRIES_TOKEN
                    }
                 }
            },
            categories: {
                myCategory: {
                    appenders: ["logentries"], 
                    level: "debug"
                }
            }
});

var logger = log4js.getLogger("myCategory");
logger.debug("Hello, LogEntries!");
```