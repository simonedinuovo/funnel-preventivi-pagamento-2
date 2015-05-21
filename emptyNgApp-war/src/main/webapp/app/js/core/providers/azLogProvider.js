/**
 * @ngdoc overview
 * @name azDirectCore.loggerModule
 * @description Angular Module containing all validation directives.
 */
angular.module('azDirectCore.loggerModule', [])
    .provider('azLog', function() {
        // In the provider function, you cannot inject any
        // service or factory. This can only be done at the
        // "$get" method.


        function CustomApplicationLayout(LO) {
            this.loggerObject = LO ;
        }
        CustomApplicationLayout.prototype = new log4javascript.Layout();

        CustomApplicationLayout.prototype.format = function(loggingEvent) {
            var obj = this.loggerObject;
            obj.PayLoad ={messages : loggingEvent.messages};
            return JSON.stringify(obj);
        };
        CustomApplicationLayout.prototype.ignoresThrowable = function() {return false;};
        CustomApplicationLayout.prototype.toString = function() {return "CustomApplicationLogLayout";};
        // Disable batching
        CustomApplicationLayout.prototype.allowBatching = function() { return false;};
        CustomApplicationLayout.prototype.getContentType = function() {return "application/json"; };




        function CustomTraceLayout(LO) {this.loggerObject = LO ;}
        CustomTraceLayout.prototype = new log4javascript.Layout();

        CustomTraceLayout.prototype.format = function(loggingEvent) {
            var obj = this.loggerObject;
            obj.PayLoad = loggingEvent.messages[0];
            return JSON.stringify(obj);
        };

        CustomTraceLayout.prototype.toString = function() {return "CustomTraceLayout";};
        // Disable batching
        CustomTraceLayout.prototype.allowBatching = function() { return false;};
        CustomTraceLayout.prototype.getContentType = function() {return "application/json"; };


        this.$get = ["technicalHeaderFactory", "dotConfigService", function(technicalHeaderFactory, dotConfigService) {


            var log = undefined;
            var logTrace = undefined;
            var self = null;
            var doConfig = function (config,doLog)
            {
                if(self == null)
                {
                    try {

                        /**
                         * Performing Application logger  with custom appender ( it use the CustomApplicationLayout )
                         */
                        log = log4javascript.getLogger("applicationLogger");
                        var ajaxAppender = new log4javascript.AjaxAppender(config.applicationLog.endpoint);
                        ajaxAppender.addHeader("Content-Type", "application/json");
                        ajaxAppender.setThreshold(log4javascript.Level[config.applicationLog.logLevel]);
                        ajaxAppender.setLayout(new CustomApplicationLayout(loggerObject));
                        log.addAppender(ajaxAppender);


                        /**
                         * Performing Profiling logger  with custom appender ( it use the CustomTraceLayout )
                         */
                        logTrace = log4javascript.getLogger("profilingLogger");
                        var ajaxAppenderTrace = new log4javascript.AjaxAppender(config.performanceLog.endpoint);
                        ajaxAppenderTrace.addHeader("Content-Type", "application/json");
                        ajaxAppenderTrace.setThreshold(log4javascript.Level[config.performanceLog.logLevel]);
                        ajaxAppenderTrace.setLayout(new CustomTraceLayout(loggerObject));
                        logTrace.addAppender(ajaxAppenderTrace);
                    }
                    catch(e)
                    {
                        console.error("Error during configuration of logger : "+e);
						log = console;
						logTrace = console;
                    }
                    self = this;
                }
                doLog();
            }

            var configPromise =  dotConfigService.getConfiguration('log4javascript.json');
            var loggerObject = {
                techicalHeader : technicalHeaderFactory()
            };
            return {
                info : function(msg){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            log.info(msg);
                    })});
                },
                debug : function(msg){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            log.debug(msg);
                    })});
                },
                error : function(msg){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            log.error(msg);
                        })});
                },
                warn : function(msg){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            log.warn(msg);
                        })});
                },
                trace : function(msg){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            log.trace(msg);
                        })});
                },
                fatal : function(msg){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            log.fatal(msg);
                        })});
                },
                profilingStart : function(callerKey, serviceName, timing){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            var PayLoad = {
                                service : serviceName,
                                timestamp : timing,  //timestamp di inizio
                                callkey : callerKey, // chiave random che lega timestamp inizio
                                type : "BEGIN"  // tipologia di timestamp, inizio, fine
                            };
                            logTrace.info(PayLoad);
                        })});
                },
                profilingEndOK : function(callerKey, serviceName, timing){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            var PayLoad = {
                                service : serviceName,
                                timestamp : timing,  //timestamp di fine
                                callkey : callerKey, // chiave random che lega timestamp inizio
                                type : "END"  // tipologia di timestamp, inizio, fine
                            };
                            logTrace.info(PayLoad);
                        })});
                },
                profilingEndKO : function(callerKey, serviceName, timing){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            var PayLoad = {
                                service : serviceName,
                                timestamp : timing,  //timestamp di fine
                                callkey : callerKey, // chiave random che lega timestamp inizio
                                type : "END-ERROR"  // tipologia di timestamp, inizio, fine
                            };
                            logTrace.info(PayLoad);
                        })});
                },
                profilingTimeout : function(callerKey, serviceName, timing){
                    configPromise.then(function(config) {
                        doConfig(config,function(){
                            var PayLoad = {
                                service : serviceName,
                                timestamp : timing,  //timestamp di fine
                                callkey : callerKey, // chiave random che lega timestamp inizio
                                type : "END-TIMEOUT"  // tipologia di timestamp, inizio, fine
                            };
                            logTrace.info(PayLoad);
                        })});
                }
            }

        }];

    });



