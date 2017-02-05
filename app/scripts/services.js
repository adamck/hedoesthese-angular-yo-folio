/*globals Constants*/

'use strict';

/* Services */
angular.module('folio.services', ['ngResource'])
  .factory('DataService', function($resource) {
    return $resource(Constants.DATA_URL, {});
  });
