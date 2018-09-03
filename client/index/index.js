
var mainApp = angular.module('mainApp', ['ui.router']);
mainApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/venda-central');

	$stateProvider.state('venda-central', {
		url: '/venda-central',
		template: '<venda-central></venda-central>',
	})
	$stateProvider.state('home', {
		url: '/home',
		template: '<home></home>',
	})

});

mainApp.controller('headerController', ['$rootScope','$scope', '$state', function ($rootScope, $scope, $state) {
	$scope.redirectHome = function () {
		$state.go('home')
	}
	$scope.redirectVendaCentral = function () {
		$state.go('venda-central')
	}
}]);
