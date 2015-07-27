'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
])
// preventing navigation bacross the app if user is not authorized
.run(['$rootScope', '$location', 'Authentication', function($rootScope, $location, Authentication) {
	$rootScope.$on('$stateChangeStart', function(event, toState) {
		if(toState.name !== 'home' && toState.name !== 'signin' && toState.name !== 'signup') {
			if(!Authentication.user) {
				$location.path('/signin')
			}
		}
	});
}]);