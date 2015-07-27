'use strict';

angular.module('books')
	.controller('BookDetailsController', ['$rootScope', '$scope', 'BookService', '$stateParams', 'Authentication', '$location', '$timeout', '$http', '$window',function($rootScope, $scope, Book, $stateParams, Authentication, $location, $timeout, $http, $window) {
		//send post request to server as soon as rating was changed
		$scope.sendRate = function() {
			var bookId = $scope.book._id;
			$http.post('/book/rate/' + bookId, {rate: $scope.book.rating});
		};
		
		$scope.authentication = Authentication;
		$scope.formVisible = false;

		// get data from DB
		if($location.path().indexOf('browse') !== -1) {
			$scope.book = Book.browse.get({author: $stateParams.author, slug: $stateParams.slug});
			$scope.title = $scope.book.title;
		}

		if($location.path().indexOf('buy') !== -1) {
			$scope.book = Book.buy.get({author: $stateParams.author, slug: $stateParams.slug});
			$scope.title = $scope.book.title;
		}

		$scope.remove = function() {
			if($location.path().indexOf('browse') !== -1) {
				Book.browse.remove({author: $stateParams.author, slug: $stateParams.slug}, function() {
					$scope.success = true;
					$scope.message = 'Book Removed';
					$timeout(function() {
						$location.path('/book/browse');
						$scope.success = false;
						$scope.message = '';
					}, 2000);
				}, function(error) {
					$scope.error = error.data.message;
				});
			}

			if($location.path().indexOf('buy') !== -1) {
				Book.buy.remove({author: $stateParams.author, slug: $stateParams.slug}, function() {
					$scope.success = true;
					$scope.message = 'Book Removed';
					$timeout(function() {
						$location.path('/book/buy');
						$scope.success = false;
						$scope.message = '';
					}, 2000);
				}, function(error) {
					$scope.error = error.data.message;
				});
			}
		};

		$scope.showForm = function() {
			$scope.formVisible = true;
		};

		$scope.buy = function() {
			var url = '/book/buy/' + $scope.book._id;
			$http.post(url, {card: $scope.card})
					.success(function(data) {
						// making form invisible
						$scope.formVisible = false;
						// link for downloading
						var link = jQuery('<a>Download Book</a>').attr('href', data).appendTo(jQuery('.col-md-9'));
						// removes link after download starts
						link.click(function() {
							link.remove();
						});
					});
		};

		// updates $rootScope to see changes in Sidebar
		function getHistory() {
			$http.get('/user/history').success(function(data) {
				data.sort(function(dataA, dataB) {
					return dataA.date - dataB.date;
				});
				if(data.length > 3) {
					$rootScope.history = data.slice(data.length - 3);
				} else {
					$rootScope.history = data;
				}
			});
		}

		$scope.favourite = function() {
			$http.post('/book/favourite/' +  $scope.book._id)
					.success(function() {
						$scope.success = true;
						$scope.message = 'Book Added To Favourite';
						getHistory();
						$timeout(function(){
							$scope.success = false;
							$scope.message = '';
						}, 1000);
					})
					.error(function(response) {
						$scope.error = response.message;
						$timeout(function(){
							$scope.error = false;
							$scope.message = '';
						}, 1000);
					});
		};

		$scope.wishlist = function() {
			$http.post('/book/wishlist/' +  $scope.book._id)
					.success(function() {
						$scope.success = true;
						$scope.message = 'Book Added To Wishlist';
						getHistory();
						$timeout(function(){
							$scope.success = false;
							$scope.message = '';
						}, 1000);
					})
					.error(function(response) {
						$scope.error = response.message;
						$timeout(function(){
							$scope.error = false;
							$scope.message = '';
						}, 1000);
					});
		};

		$scope.mustread = function() {
			$http.post('/book/mustread/' +  $scope.book._id)
					.success(function() {
						$scope.success = true;
						$scope.message = 'Book Added To Must Read Titles';
						getHistory();
						$timeout(function(){
							$scope.success = false;
							$scope.message = '';
						}, 1000);
					})
					.error(function(response) {
						$scope.error = response.message;
						$timeout(function(){
							$scope.error = false;
							$scope.message = '';
						}, 1000);
					});
		};
	}]);