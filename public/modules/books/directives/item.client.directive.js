'use strict';

angular
	.module('books')
	.directive('bookItem', ['$http', function($http) {
		return {
			restrict: 'A',
			scope: '=',
			templateUrl: 'modules/books/views/item.client.view.html',
			link: function(scope) {
				//watching rate model for each item, send post request to server as soon as rating was changed
				scope.$watch('book.rating', function(newValue, oldValue) {
					var bookId = scope.book._id;
					if(newValue !== oldValue) {
						$http.post('/book/rate/' + bookId, {rate: newValue});
					}
				});
			}
		};
	}]);