'use strict';

angular
	.module('books')
	.controller('BookController', ['$scope', '$location', '$http', function($scope, $location, $http) {
		
		// set init value for mainFilter
		$scope.mainFilter = 'title';

		// define page title based on path
		switch($location.path()) {
			case '/book/browse':
				$scope.title = 'Browse Available Books';
				break;

			case '/book/buy': 
				$scope.title = 'Browse Books To Buy';
				break;	

			case '/book/best': 
				$scope.title = 'List Of The Best';
				$http.get('/book/best').success(function(data) {
					$scope.books = data;
				});
				break;	

			case '/book/favourite':
				$scope.title = 'Your Favourite Books';
				$http.get('/book/favourite').success(function(data) {
					$scope.books = data;
				});
				break;

			case '/book/wishlist':
				$scope.title = 'Your Wishlist';
				$http.get('/book/wishlist').success(function(data) {
					$scope.books = data;
				});
				break;
				
			case '/book/mustread':
				$scope.title = 'Your Must Read Titles';
				$http.get('/book/mustread').success(function(data) {
					$scope.books = data;
				});
				break;		
		}
	}]);