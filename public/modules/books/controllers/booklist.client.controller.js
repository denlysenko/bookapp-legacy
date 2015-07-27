'use strict';

angular.module('books')
	.controller('BookListController', ['$scope', 'BookService', function($scope, Book) {
		// get data from DB
		if($scope.title === 'Browse Available Books') {
			Book.browse.query(function(data) {
				$scope.books = data;
			});
			
		}

		if($scope.title === 'Browse Books To Buy') {
			$scope.books = Book.buy.query();
		}
	}]);