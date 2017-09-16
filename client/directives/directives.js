var mainApp = angular.module('mainApp');
const PATH_DIRECTIVES = 'directives/'

// HOME
mainApp.directive('home', function ($interval) {
  return {
    restrict: 'E',
    templateUrl: PATH_DIRECTIVES + 'home/home.html',
    controller: 'homeController'
  }
});

mainApp.directive('vendaCentral', function ($interval) {
  return {
    restrict: 'E',
    templateUrl: PATH_DIRECTIVES + 'vendaCentral/vendaCentral.html',
    controller: 'vendaCentralController'
  }
});

