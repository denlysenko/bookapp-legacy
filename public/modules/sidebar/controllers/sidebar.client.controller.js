'use strict';

angular.module('sidebar').controller('SidebarController', ['$rootScope', '$scope', '$location', '$http','Authentication', function($rootScope, $scope, $location, $http, Authentication) {
		$scope.authentication = Authentication;

		function getHistory() {
			$http.get('/user/history').success(function(data) {
				data.sort(function(a, b) {
					if (a.date < b.date) {
				    return 1;
				  }
				  if (a.date > b.date) {
				    return -1;
				  }
				  return 0;
				});

				if(data.length > 3) {
					$rootScope.history = data.slice(data.length - 3);
				} else {
					$rootScope.history = data;
				}
			});
		}

		if($scope.authentication.user) {
			getHistory();
		}

		$scope.isActive = function(route) {
			return $location.path().indexOf(route) !== -1;
		};
}]);
