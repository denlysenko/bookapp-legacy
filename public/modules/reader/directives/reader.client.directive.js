'use strict';

angular.module('reader').directive('bookReader', [function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			// as epub is not available because of AJAX response may be not available, watching for the changing and when epub is available creating reader
			scope.$watch('epub', function(oldValue, newValue) {
				if(oldValue !== newValue) {
					var reader = ePubReader(scope.epub);
				}
			});
		}
	};
}]);