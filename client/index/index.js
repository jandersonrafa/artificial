
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
