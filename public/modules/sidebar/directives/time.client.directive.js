'use strict';

angular.module('sidebar').directive('time', ['$interval', '$filter', function($interval, $filter) {
	// update time every minute
	return function(scope, element, attrs) {
		var time = attrs.time,
				interval = 60 * 1000,
				filter = $filter('dateDiff');

		function update() {
			element.text(filter(time));
		}		

		var timeoutId = $interval(update, interval);

		element.bind('$destroy', function() {
			$interval.cancel(timeoutId);
		});

		update();
	};
}]);