var mainApp = angular.module('mainApp');

mainApp.controller('homeController', function ($scope, $http) {
	$scope.message = "$scope.message : from homeController";

	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('api/todos').then(
		function (response) {
			$scope.todos = response.data;
		}, function (error) {
			console.log('Error: ' + error.data);
		});
		
		$scope.createTodo = function () {
			$http.post('api/todos', $scope.formData).then(
				function (response) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.todos = response.data;
				console.log(response);
			}, function (error) {
				console.log('Error: ' + error.data);
			});
	}

	$scope.deleteTodo = function (id) {
		$http.delete('api/todos/' + id).then(
			function (response) {
				$scope.todos = response.data;
			}, function (error) {
				console.log('Error: ' + error.data);
			});

	}
});