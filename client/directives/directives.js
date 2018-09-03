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

mainApp.directive('iaInputRadio', function ($interval) {
  return {
    restrict: 'E',
    templateUrl: PATH_DIRECTIVES + 'iaInputRadio/iaInputRadio.html',
    controller: 'iaInputRadioController',
    scope : {
      text: "@text",
      model: "=model",
      options: "=?options",
      name: "@name",
    }
  }
});

