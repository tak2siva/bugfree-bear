angular.module('movieApp.controllers',[]).controller('MovieListController',function($scope,$state,$stateParams,$window,Movie){
	$scope.movies = Movie.query();
	
	$scope.deleteMovie = function(movie){
		//if(popupService.showPopup('Delete it ?')){
			movie.$delete(function(){
				console.log("deleted");		
				//$window.location.href = '';
			$state.transitionTo($state.current, $stateParams, {
			    reload: true,
			    inherit: false,
			    notify: true
			});
				//$state.go('movies');
			});
		//}
	};
}).controller('MovieViewController', function($scope,$stateParams,Movie){
	$scope.movie = Movie.get({id:$stateParams.id});
	console.log($scope.movie);
}).controller('MovieEditController', function($scope, $state, $stateParams, Movie){
	$scope.loadMovie = function(){
		$scope.movie = Movie.get({id: $stateParams.id});
	};
	
	$scope.updateMovie = function(){
		$scope.movie.$update(function(){
			$state.go("movies");			
		});
	};
	
	$scope.loadMovie();
}).controller('MovieCreateController',function($scope, $state, $stateParams, Movie){
	$scope.movie = new Movie();
	
	$scope.addMovie = function(){
		$scope.movie.$save(function(){
			$state.go("movies");	
		});
	};
});
