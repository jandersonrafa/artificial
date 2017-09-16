var mainApp = angular.module('mainApp');

mainApp.controller('vendaCentralController', function ($scope, $http) {
	const BASE_URL = 'venda-central';
	$scope.message = "$scope.message : from vendaCentralController";

	$scope.formData = {};

	// busca lista de vendaCentral
	$http.get(BASE_URL + '/api/find').then(
		function (response) {
			$scope.listVendaCentral = response.data;
		}, function (error) {
			console.log('Error: ' + error.data);
		});

	$scope.createVendaCentral = function () {
		$http.post(BASE_URL + '/api/create', $scope.formData).then(
			function (response) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.listVendaCentral = response.data;
				console.log(response);
			}, function (error) {
				console.log('Error: ' + error.data);
			});
	}

	$scope.deletevendaCentral = function (id) {
		$http.delete(BASE_URL + '/api/delete/' + id).then(
			function (response) {
				$scope.listVendaCentral = response.data;
			}, function (error) {
				console.log('Error: ' + error.data);
			});

	}
});