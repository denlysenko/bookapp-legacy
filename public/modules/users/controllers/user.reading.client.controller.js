'use strict';

angular.module('users').controller('ReadingController', ['$http', '$location', function($http, $location) {
	$http.get('/user/reading')
		.success(function(response) {
			$location.path(response);
		})
		.error(function(response) {
			
		});
}]);