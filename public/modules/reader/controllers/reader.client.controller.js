'use strict';

angular.module('reader').controller('ReaderController', ['$scope', '$http', '$stateParams', 'Authentication', function($scope, $http, $stateParams, Authentication) {

	$http.get('/book/read/' + $stateParams.author + '/' + $stateParams.slug)
			.success(function(response) {
				$scope.epub = response;
			});

	// when user leave reader save current link in the DB and update Authentication.user.reading property
	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

		var link = fromState.url.replace(':author', fromParams.author).replace(':slug', fromParams.slug);
		$http.post('/user/reading', {link: link});
		Authentication.user.reading = link;
	});	

	angular.element(window).onbeforeunload = function() {
		$http.post('/user/reading', {link: Authentication.user.reading});
	};	
}]);