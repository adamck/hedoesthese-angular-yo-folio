'use strict';

var ROUTE_PROJECT = 'project';
var ROUTE_ABOUT   = 'colophon';
var ROUTE_EMAIL   = 'email';
var DATA_URL = 'data/folio.json';

// Declare app level module which depends on filters, and services
angular
	//.module('folio', ['folio.services', 'folio.directives', 'ngSanitize'])
	.module('folio', ['folio.services', 'ngSanitize'])
	.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/'+ ROUTE_PROJECT +'/:id',
				{
					templateUrl: 'views/project.html',
					controller: ProjectCtrl
				}
			);
			$routeProvider.when('/'+ ROUTE_ABOUT,
				{
					templateUrl: 'views/about.html',
					controller: AboutCtrl
				}
			);
			// $routeProvider.when('/'+ ROUTE_EMAIL,
			// 	{
			// 		templateUrl: 'views/email.html',
			// 		controller: EmailCtrl
			// 	}
			// );
			$routeProvider.otherwise({redirectTo: ''});
		}]
	);

function log(msg) {
	// if(console && console.log) {
		// console.log(msg);
	// }
}