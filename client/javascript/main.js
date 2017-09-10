var mainApp = angular.module('mainApp', ['ngRoute']);
mainApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'views/teste.html',
				controller: 'homeController'
			})
			.when('/viewGalaxies', {
				templateUrl: 'views/viewGalaxies.html',
				controller: 'viewGalaxiesController'
			})
			.otherwise({
				redirectTo: '/home'
			});
	}]);

mainApp.controller('homeController', function ($scope) {
	$scope.message = "$scope.message : from homeController";
});

mainApp.controller('viewGalaxiesController', function ($scope) {
	$scope.galaxies = [
		{ 'name': 'Milkyway', 'distance': '27,000 Light years' },
		{ 'name': 'Andromeda', 'distance': '2,560,000 Light years' },
		{ 'name': 'Sagittarius Dwarf', 'distance': '3.400,000 Light years' }
	];

	$scope.add = function () {
		d = {}
		d['name'] = $scope.name;
		d['distance'] = $scope.distance;
		$scope.message = $scope.name + " " + $scope.distance
		$scope.galaxies.push(d);
		$scope.name = "";
		$scope.distance = "";
		$scope.message = $scope.galaxies;
	};
});
// function mainController($scope, $http) {
// 	$scope.formData = {};

// 	// when landing on the page, get all todos and show them
// 	$http.get('/api/todos')
// 		.success(function (data) {
// 			$scope.todos = data;
// 		})
// 		.error(function (data) {
// 			console.log('Error: ' + data);
// 		});

// 	// when submitting the add form, send the text to the node API
// 	$scope.createTodo = function () {
// 		$http.post('/api/todos', $scope.formData)
// 			.success(function (data) {
// 				$scope.formData = {}; // clear the form so our user is ready to enter another
// 				$scope.todos = data;
// 				console.log(data);
// 			})
// 			.error(function (data) {
// 				console.log('Error: ' + data);
// 			});
// 	};

// 	// delete a todo after checking it
// 	$scope.deleteTodo = function (id) {
// 		$http.delete('/api/todos/' + id)
// 			.success(function (data) {
// 				$scope.todos = data;
// 			})
// 			.error(function (data) {
// 				console.log('Error: ' + data);
// 			});
// 	};

// }
