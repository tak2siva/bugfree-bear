angular.module('movieApp.controllers',[]).controller('MovieListController',function($scope,$state,$stateParams,$window,Movie){
	$scope.movies = Movie.query();
	
	$scope.new_movie = null;
	
	$('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
	$('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
	
	$scope.reload_movies = function(){
		$state.transitionTo($state.current, $stateParams, {
		    reload: true,
		    inherit: false,
		    notify: true
		});
	};
	
	$scope.closeModal = function(modal_name) {
	  $("#"+modal_name).modal('hide');
	  $('body').removeClass('modal-open');
	  $('.modal-backdrop').remove();
	};
	
	$scope.deleteMovie = function(movie){
		//if(popupService.showPopup('Delete it ?')){
			movie.$delete(function(){
				console.log("deleted");		
				//$window.location.href = '';
			$scope.closeModal("editModal");		
			$scope.reload_movies();
				//$state.go('movies');
			});
		//}
	};
	
	$scope.initMovie = function(){
		$scope.movie = new Movie();
		console.log("initMovie");
	};
	
	$scope.saveMovie = function(){
		$scope.movie.$save(function(){
			console.log("new movie added");
			$scope.closeModal("myModal");
			$scope.reload_movies();
		});
	};
	
	$scope.editMovieCB = function(id){
		$scope.movie = Movie.get({id: id});
	};
	
	$scope.updateMovie = function(){
		$scope.movie.$update(function(){
			//$state.go("movies");
			$scope.reload_movies();			
		});		
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
