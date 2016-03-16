/*globals ProjectCtrl, AboutCtrl*/

'use strict';

var ROUTE_PROJECT = 'project';
var ROUTE_ABOUT   = 'colophon';

angular
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
			$routeProvider.otherwise({redirectTo: ''});
		}]
	);
