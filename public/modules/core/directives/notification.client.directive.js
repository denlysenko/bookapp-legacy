'use strict';

angular.module('core').directive('notification', ['$timeout', function($timeout) {
	return {
		scope: {},
		templateUrl: 'modules/core/views/notification.client.view.html',
		link: function(scope, element, attrs) {
			// catch event message from rootScope and make notification
			scope.$on('message', function(event, message) {
				scope.message = message;
				element.slideDown();
				$timeout(function(){
					element.slideUp();
					scope.message = null;
				}, 3000);
			});
		}
	};
}]);