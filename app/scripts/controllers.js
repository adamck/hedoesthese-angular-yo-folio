/*globals $, _, Constants*/
'use strict';


// TODO:
// - Break out controllers into files
// - add constants to new Constants class or config object


function initProjectTiling() {
  $('#project_list').freetile({
    selector: '.list-item',
    animate: true,
    elementDelay: 0,
    customEvents: 'refreshList'
  });
}


/* Controllers */
var MainCtrl = function( $scope, $location, $timeout, $http, DataService) {
  //for ng-view controllers
  $scope.projects = DataService.get();

  $scope.gotoProj = function(pId) {
    $location.path('/' + Constants.ROUTE_PROJECT + '/' + pId);
  };

  //fade out ng-view content and return to index
  $scope.overlayFadeOut = false;

  $scope.hideOverlay = function() {
    $scope.overlayFadeOut = true;
    $timeout(function() {
      $location.path('');
      $scope.overlayFadeOut = false;
    }, 100);

    $('.project_list').trigger('refreshList');
  };
};

MainCtrl.$inject = ['$scope', '$location', '$timeout', '$http', 'DataService', '$rootScope'];


// Outside of ng-view
var ProjectListCtrl = function($scope, $rootScope, DataService, $location) {
  $scope.loaded = false;
  $scope.projects = DataService.get(function() {
    setTimeout(function() {
      $('#project_list img').imagesLoaded(function() {
        initProjectTiling();
      });
    }, 100);

    $scope.loaded = true;
  });

  $scope.showingDetail = false;

  $rootScope.$on('$routeChangeSuccess', function() {

    //assume anything other than root is an overlay detail -- may need to change this.
    var p = $location.path();
    var isDetail = (p !== '' && p !== '/');
    $scope.showingDetail = isDetail;
  });
};
ProjectListCtrl.$inject = ['$scope', '$rootScope', 'DataService', '$location'];


function ProjectCtrl($scope, $timeout, $location, $routeParams) {
  var projs = $scope.projects.items;

  //left, right, esc
  $('body')
    .unbind('keydown')
    .bind('keydown', function(e) {
      if(e.keyCode === 37 || e.which === 37) {
        //left
        $scope.prevProj();

      } else if(e.keyCode === 39 || e.which === 39) {
        //right
        $scope.nextProj();

      } else if(e.keyCode === 27 || e.which === 27) {
        //esc
        $scope.hideOverlay();
      }
    });

  // Methods
  $scope.nextProj = function() {
    var next = _.indexOf( projs, $scope.project ) + 1;
    if(next >= projs.length) {
      next = 0;
    }
    $scope.gotoProj(projs[next].id);
  };

  $scope.prevProj = function() {
    var prev = _.indexOf( projs, $scope.project ) - 1;
    if(prev < 0 ) {
      prev = projs.length - 1;
    }
    $scope.gotoProj(projs[prev].id);
  };

  //assign model values
  $scope.id = $routeParams.id;
  $scope.project = _.find(projs, function(proj) {
    return proj.id === $routeParams.id;
  });
}

ProjectCtrl.$inject = ['$scope', '$timeout', '$location', '$routeParams', 'DataService'];


var AboutCtrl = function($scope) {
  $('body')
    .unbind('keydown')
    .bind('keydown', function(e) {
      if(e.keyCode === 27 || e.which === 27) {
        //esc
        $scope.hideOverlay();
      }
    });
};

AboutCtrl.$inject = ['$scope'];
