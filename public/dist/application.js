'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'my-book-app';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate',  'ui.router', 'ui.bootstrap', 'ui.utils', 'ngFileUpload', 'btford.socket-io'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('books');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('comments');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('reader');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('sidebar');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
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

'use strict';

angular.module('books')
  .controller('AddbookController', ['$scope','Upload', function($scope, Upload) {
    $scope.title = 'Add Book';
    // init value for paid model
    $scope.book = {};
    $scope.book.paid = false;
    $scope.add = function() {
      $scope.success = $scope.error = null;
      // Object File to upload created by the browser is an Array. To extract exactly file using indexes 
      var files = [$scope.cover[0], $scope.epub[0]],
          filesName = ['cover', 'epub'];
      Upload.upload({
        url: '/book/add',
        method: 'POST',
        file: files,
        fields: $scope.book,
        headers: { 'Content-Type': 'multipart/form-data' },
        fileFormDataName: filesName
      }).success(function() {
        // clear form's fields
        $scope.book = null;
        $scope.success = true;
      })
      .error(function(response) {
        $scope.error = response.message;
      });
    };
  }]);

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
'use strict';

angular.module('books').factory('BookService', ['$resource',
	function($resource) {
		return {
			browse: $resource('/book/browse/:author/:slug'),
			buy: $resource('/book/buy/:author/:slug')
		};
	}
]);
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
'use strict';


angular.module('core').controller('ContentController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.title = 'My Book App';
	}
]);
'use strict';

angular.module('core').directive('notification', ['$timeout', function($timeout) {
	return {
		scope: {},
		templateUrl: 'modules/core/views/notification.client.view.html',
		link: function(scope, element, attrs) {
			// catch event message from rootScope and make notification
			scope.$on('message', function(event, message) {
				scope.message = message;
				element.slideDown();
				$timeout(function(){
					element.slideUp();
					scope.message = null;
				}, 3000);
			});
		}
	};
}]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

//socket factory that provides the socket service
angular.module('core').factory('Socket', ['socketFactory',
  function(socketFactory) {
    return socketFactory();
  }
]);
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
'use strict';

angular.module('reader').directive('bookReader', [function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			// as epub is not available because of AJAX response may be not available, watching for the changing and when epub is available creating reader
			scope.$watch('epub', function(oldValue, newValue) {
				if(oldValue !== newValue) {
					var reader = ePubReader(scope.epub);
				}
			});
		}
	};
}]);
'use strict';

angular.module('sidebar').controller('SidebarController', ['$rootScope', '$scope', '$location', '$http','Authentication', function($rootScope, $scope, $location, $http, Authentication) {
		$scope.authentication = Authentication;

		function getHistory() {
			$http.get('/user/history').success(function(data) {
				data.sort(function(a, b) {
					if (a.date < b.date) {
				    return 1;
				  }
				  if (a.date > b.date) {
				    return -1;
				  }
				  return 0;
				});

				if(data.length > 3) {
					$rootScope.history = data.slice(data.length - 3);
				} else {
					$rootScope.history = data;
				}
			});
		}

		if($scope.authentication.user) {
			getHistory();
		}

		$scope.isActive = function(route) {
			return $location.path().indexOf(route) !== -1;
		};
}]);

'use strict';

angular.module('sidebar').directive('time', ['$interval', '$filter', function($interval, $filter) {
	// update time every minute
	return function(scope, element, attrs) {
		var time = attrs.time,
				interval = 60 * 1000,
				filter = $filter('dateDiff');

		function update() {
			element.text(filter(time));
		}		

		var timeoutId = $interval(update, interval);

		element.bind('$destroy', function() {
			$interval.cancel(timeoutId);
		});

		update();
	};
}]);
'use strict';

angular.module('sidebar').filter('dateDiff', function() {
	return function(date) {
		var diff = Math.ceil((Date.now() - new Date(date).getTime())/60000);

		if(diff < 60) {
			return diff + ' minutes ago';
		}

		if(diff < 86400) {
			return Math.floor(diff / 60) + ' hours ago';
		}

		if(diff >= 86400) {
			return Math.floor(diff / 86400) + ' days ago';
		}
	};
});
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		})
		.state('history', {
			url: '/user/history',
			templateUrl: 'modules/users/views/users.history.client.view.html',
			controller: 'HistoryController'
		})
		.state('help', {
			url: '/user/help',
			templateUrl: 'modules/users/views/users.help.client.view.html',
			controller: 'HelpController'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', 'Upload',
	function($scope, $http, $location, Authentication, Upload) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			if($scope.avatar) {
				Upload.upload({
          url: '/auth/signup',
          fields: $scope.credentials,
          file: $scope.avatar
        }).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;

					// And redirect to the index page
					$location.path('/');
				}).error(function(response) {
					$scope.error = response.message;
				});
			} else {
				$http.post('/auth/signup', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;

					// And redirect to the index page
					$location.path('/');
				}).error(function(response) {
					$scope.error = response.message;
				});
			}
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication', 'Upload',
	function($scope, $http, $location, Users, Authentication, Upload) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				// if there is avatar to update
				if($scope.avatar) {
					Upload.upload({
	          url: '/users',
	          method: 'PUT',
	          fields: $scope.user,
	          file: $scope.avatar
	        }).success(function(response) {
						// If successful we assign the response to the global user model
						$scope.success = true;
						$scope.user = Authentication.user = response;
					}).error(function(response) {
						$scope.error = response.message;
					});
				} else {
					var user = new Users($scope.user);

					user.$update(function(response) {
						$scope.success = true;
						$scope.user = Authentication.user = response;
					}, function(response) {
						$scope.error = response.data.message;
					});
				}
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('ReadingController', ['$http', '$location', function($http, $location) {
	$http.get('/user/reading')
		.success(function(response) {
			$location.path(response);
		})
		.error(function(response) {
			
		});
}]);
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
'use strict';

angular.module('users').controller('HistoryController', ['$scope', '$http', function($scope, $http) {
	$http.get('/user/history').success(function(data) {
		data.sort(function(dataA, dataB) {
			return dataA.date - dataB.date;
		});
		$scope.history = data;
		$scope.predicate = 'date';
		$scope.reverse = true;
		$scope.sort = function(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		};
	});
}]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);