'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication', 'Upload',
	function($scope, $http, $location, Users, Authentication, Upload) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				// if there is avatar to update
				if($scope.avatar) {
					Upload.upload({
	          url: '/users',
	          method: 'PUT',
	          fields: $scope.user,
	          file: $scope.avatar
	        }).success(function(response) {
						// If successful we assign the response to the global user model
						$scope.success = true;
						$scope.user = Authentication.user = response;
					}).error(function(response) {
						$scope.error = response.message;
					});
				} else {
					var user = new Users($scope.user);

					user.$update(function(response) {
						$scope.success = true;
						$scope.user = Authentication.user = response;
					}, function(response) {
						$scope.error = response.data.message;
					});
				}
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);