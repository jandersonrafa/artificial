var mainApp = angular.module('mainApp');

mainApp.controller('iaInputRadioController', function ($scope, $http) {
	if (!$scope.options) {
		$scope.options = [{ text: 'Sim', value:true }, { text: 'Não', value: false }];
	}
});