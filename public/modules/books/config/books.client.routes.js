'use strict';

angular.module('books')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
	    .state('add', {
	      url: '/book/add',
	      templateUrl: 'modules/books/views/add.client.view.html',
	      controller: 'AddbookController'
	    })
	    .state('browse', {
	    	url: '/book/browse',
	    	templateUrl: 'modules/books/views/books.client.view.html',
	    	controller: 'BookController'
	    })
	    .state('detailsBrowse', {
	    	url: '/book/browse/:author/:slug',
	    	templateUrl: 'modules/books/views/book.details.client.view.html',
	    	controller: 'BookDetailsController'
	    })
	    .state('buy', {
	    	url: '/book/buy',
	    	templateUrl: 'modules/books/views/books.client.view.html',
	    	controller: 'BookController'
	    })
	    .state('detailsBuy', {
	    	url: '/book/buy/:author/:slug',
	    	templateUrl: 'modules/books/views/book.details.client.view.html',
	    	controller: 'BookDetailsController'
	    })
	    .state('best', {
	    	url: '/book/best',
	    	templateUrl: 'modules/books/views/books.client.view.html',
	    	controller: 'BookController'
	    })
	    .state('favourite', {
	    	url: '/book/favourite',
	    	templateUrl: 'modules/books/views/books.client.view.html',
	    	controller: 'BookController'
	    })
	    .state('wishlist', {
	    	url: '/book/wishlist',
	    	templateUrl: 'modules/books/views/books.client.view.html',
	    	controller: 'BookController'
	    })
	    .state('mustread', {
	    	url: '/book/mustread',
	    	templateUrl: 'modules/books/views/books.client.view.html',
	    	controller: 'BookController'
	    })
	    .state('read', {
	    	url: '/book/read/:author/:slug',
	    	templateUrl: 'modules/reader/views/reader.client.view.html',
	    	controller: 'ReaderController'
	    });
  }]);
