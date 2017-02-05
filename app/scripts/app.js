/*globals ProjectCtrl, AboutCtrl*/

'use strict';

var Constants = {
  ROUTE_PROJECT: 'project',
  ROUTE_ABOUT: 'colophon',
  DATA_URL: 'data/folio.json'
};

angular
	.module('folio', ['folio.services', 'ngSanitize'])
	.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/'+ Constants.ROUTE_PROJECT +'/:id',
				{
					templateUrl: 'views/project.html',
					controller: ProjectCtrl
				}
			);
			$routeProvider.when('/'+ Constants.ROUTE_ABOUT,
				{
					templateUrl: 'views/about.html',
					controller: AboutCtrl
				}
			);
			$routeProvider.otherwise({redirectTo: ''});
		}]
	);
