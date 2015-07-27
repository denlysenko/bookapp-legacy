'use strict';

angular.module('users').controller('HelpController', ['$scope', '$rootScope', 'Socket', function($scope, $rootScope, Socket, Authentication) {

	function isAdmin() {
		return $scope.authentication.user.roles.indexOf('admin') !== -1;
	}

	Socket.on('check:admin', function() {
		if(isAdmin()) {
			Socket.emit('online');
		}
	});

	// when admin is connected send event online
	if(isAdmin()) {
		Socket.emit('online');
	}

	// when socket recieve connect:admin event, change class to green color
	Socket.on('connect:admin', function() {
		$rootScope.online = true;
	});

	// saving in the rootScope to have access to messages after leaving help page and returning back
	$rootScope.questions = $rootScope.questions || [];

	$scope.ask = function() {
		var from = isAdmin() ? 'Admin' : $scope.authentication.user.displayName;
		Socket.emit('question', {
			from: from,
			question: $scope.question
		});
		$scope.question = '';
	};

	Socket.on('question', function(data) {
		$rootScope.questions.push(data);
		// sending event message to children
		$rootScope.$broadcast('message', data);
	});
}]);