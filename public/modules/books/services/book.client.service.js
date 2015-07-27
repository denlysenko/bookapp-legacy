'use strict';

angular.module('books').factory('BookService', ['$resource',
	function($resource) {
		return {
			browse: $resource('/book/browse/:author/:slug'),
			buy: $resource('/book/buy/:author/:slug')
		};
	}
]);