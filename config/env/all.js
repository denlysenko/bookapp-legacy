'use strict';

module.exports = {
	app: {
		title: 'My Book App',
		description: 'Search, buy, read books online',
		keywords: 'books, online, reading, search, buy'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/font-awesome/css/font-awesome.min.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ng-file-upload/ng-file-upload-all.min.js',
				'public/lib/angular-socket-io/socket.min.js',
				'public/lib/epub.js-reader/underscore-min.js',
				'public/lib/epub.js-reader/epub.min.js',
				'public/lib/epub.js-reader/zip.min.js',
				'public/lib/epub.js-reader/hooks.min.js',
				'public/lib/epub.js-reader/reader.min.js',
				'public/lib/epub.js-reader/search.js',
				'public/lib/epub.js-reader/jquery.highlight.js',
				'public/lib/epub.js-reader/highlight.js',
				'public/lib/epub.js-reader/screenfull.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
