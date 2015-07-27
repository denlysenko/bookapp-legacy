'use strict';

angular.module('users').controller('HistoryController', ['$scope', '$http', function($scope, $http) {
	$http.get('/user/history').success(function(data) {
		data.sort(function(dataA, dataB) {
			return dataA.date - dataB.date;
		});
		$scope.history = data;
		$scope.predicate = 'date';
		$scope.reverse = true;
		$scope.sort = function(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		};
	});
}]);