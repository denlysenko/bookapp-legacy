'use strict';

angular.module('comments')
		.controller('CommentsController', ['$scope', 'Authentication', '$http', function($scope, Authentication, $http) {
			$scope.comment = {};
			$scope.comment.author = Authentication.user.displayName;
			// sending comment, book._id taking from parent scope 
			$scope.addComment = function() {
				$scope.comment.book = $scope.book._id;
				$http.post('/book/' + $scope.book._id + '/comment', $scope.comment)
					.success(function(data) {
						$scope.book.comments.push(data);
						// reset to initial state
						$scope.comment = {};
						$scope.comment.author = Authentication.user.displayName;
					});
			};
		}]);