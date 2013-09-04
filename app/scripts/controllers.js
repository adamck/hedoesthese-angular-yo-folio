'use strict';


function initProjectTiling() {
	$('#project_list').freetile({
		selector: '.list-item',
		animate: true,
		elementDelay: 0,
		customEvents: 'refreshList'
	});
}

/* Controllers */
var MainCtrl = function( $scope, $location, $timeout, $http, DataService, $rootScope ) {
// function MainCtrl($scope, $location, $timeout, $http, DataService, $rootScope ) {

	//for ng-view controllers
	$scope.projects = DataService.get(function(data) {
		log('main data loaded');
	});
	

	$scope.gotoProj = function(pId) {
		log('gotoProj: '+ pId);

		$location.path('/' + ROUTE_PROJECT + '/' + pId);
		$scope.$apply();
	}

	//fade out ng-view content and return to index
	$scope.overlayFadeOut = false;
	$scope.hideOverlay = function() {
		$scope.overlayFadeOut = true;
		$timeout(function() {
			$location.path('');
			$scope.overlayFadeOut = false;
		}, 100);


		$('.project_list').trigger('refreshList')
	}

};
MainCtrl.$inject = ['$scope', '$location', '$timeout', '$http', 'DataService', '$rootScope'];



// Outside of ng-view
var ProjectListCtrl = function($scope, $rootScope, DataService, $location) {

	//dupe of ng-view ... can we fix this?
	$scope.loaded = false;
	$scope.projects = DataService.get(function(data) {
		//log('plist data')

		setTimeout(function() {
			log("has imgs: " + $('#project_list').find('img').length ) ;

			$('#project_list img').imagesLoaded(function(imgs) {
				
				//log("imgs loaded: "+ imgs.length);

				initProjectTiling();
				
			});

		}, 100);

		$scope.loaded = true;
	});
	$scope.showingDetail = false;

	$rootScope.$on('$routeChangeSuccess', function(evt, cur, prev) {
		//log('list gets a route change '+ $location.path());

		//assume anything other than root is an overlay detail -- may need to change this. 	
		var p = $location.path();
		var isDetail = (p !== "" && p !== "/");

		if(isDetail) {
			//log('fix pos of list ' + angular.element('#project_list'))
			var top = $('#project_list').offset().top
			
			log('list css top: '+ top)
			
			//$('#project_list').css('top', top+"px")
		}

		$scope.showingDetail = isDetail;
	});
};
ProjectListCtrl.$inject = ['$scope', '$rootScope', 'DataService', '$location'];




function ProjectCtrl($scope, $timeout, $location, $routeParams, DataService) {
	//log("show project: " + $routeParams.id + ", "+ $scope.projects.items.length)

	var projs = $scope.projects.items;
	
	//left, right, esc
	$('body').unbind('keydown');
	$('body').bind('keydown', function(e) {
		//log('btn: '+ e.keyCode + ', ' + e.which)
		if(e.keyCode == 37 || e.which == 37) {
			//left
			$scope.prevProj();

		} else if(e.keyCode == 39 || e.which == 39) {
			//right
			$scope.nextProj();

		} else if(e.keyCode == 27 || e.which == 27) {
			//esc
			$scope.hideOverlay();
		}
	});
	
	// Methods
	$scope.nextProj = function() {
		var next = _.indexOf( projs, $scope.project ) + 1;
		if(next >= projs.length) next = 0;
		$scope.gotoProj(projs[next].id);
	}

	$scope.prevProj = function() {
		var prev = _.indexOf( projs, $scope.project ) - 1;
		if(prev < 0 ) prev = projs.length - 1;
		$scope.gotoProj(projs[prev].id);
	}

	//assign model values
	$scope.id = $routeParams.id;
	$scope.project = _.find(projs, function(proj) {return proj.id === $routeParams.id});
};
ProjectCtrl.$inject = ['$scope', '$timeout', '$location', '$routeParams', 'DataService'];




var AboutCtrl = function($scope) {
	$('body').unbind('keydown');
	$('body').bind('keydown', function(e) {
		//log('btn: '+ e.keyCode + ', ' + e.which)
		if(e.keyCode == 27 || e.which == 27) {
			//esc
			$scope.hideOverlay();
		}
	});
}
AboutCtrl.$inject = ['$scope'];


/*
function EmailCtrl($scope) {
	$('body').unbind('keydown');
	$('body').bind('keydown', function(e) {
		//log('btn: '+ e.keyCode + ', ' + e.which)
		if(e.keyCode == 27 || e.which == 27) {
			//esc
			$scope.hideOverlay();
		}
	});
}*/
