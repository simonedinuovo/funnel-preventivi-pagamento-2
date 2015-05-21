angular.module('azDirectCore.validationModule')

/**
 * @ngdoc service
 * @name azDirectCore.validationModule.dateDiff
 *
 * @description The dateDiff contains function that help during develop with Date;
 * */
    .factory('dateDiff', function() {

        return {
            /**
             * @ngdoc method
             * @name inDay
             * @methodOf azDirectCore.validationModule.dateDiff
             * @description factory fiscalCode
			 *
             * @param {Date} Date1 Starting date to make diff
             * @param {Date} Date2 Ending date to make diff
			 *
			 *
             */
            inDays: function(d1, d2) {

                d2.setHours(23);
                d2.setMinutes(59);
                d2.setSeconds(59);
                var t2 = d2.getTime();
                var t1 = d1.getTime();
                var d2
                return parseInt((t2-t1)/(24*3600*1000));
            },

            inWeeks: function(d1, d2) {
                d2.setHours(23);
                d2.setMinutes(59);
                d2.setSeconds(59);
                var t2 = d2.getTime();
                var t1 = d1.getTime();

                return parseInt((t2-t1)/(24*3600*1000*7));
            },

            inMonths: function(d1, d2) {
                d2.setHours(23);
                d2.setMinutes(59);
                d2.setSeconds(59);
                var d1Y = d1.getFullYear();
                var d2Y = d2.getFullYear();
                var d1M = d1.getMonth();
                var d2M = d2.getMonth();

                return (d2M+12*d2Y)-(d1M+12*d1Y);
            },

            inYears: function(d1, d2) {
                d2.setHours(23);
                d2.setMinutes(59);
                d2.setSeconds(59);
                var ageDifMs = d1.getTime() - d2.getTime();

                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                //return (ageDifMs<0? (ageDate.getUTCFullYear() - 1970)*-1 : (ageDate.getUTCFullYear() - 1970) ); // keep negative if is
                return (ageDate.getUTCFullYear() - 1970)*-1;
            }
        };
    });
