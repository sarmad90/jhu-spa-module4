(function(){
  angular.module('MenuApp').config(RoutesConfig);
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
      .state('tab1', {
        url: '/tab1',
        template: "<h2>Hi from routes</h2>"
        // templateUrl: 'src/tab1.html'
      })

      .state('home', {
        url: '/',
        template: "<h2>Home Page</h2>"
      })


      .state('tab2', {
        url: '/tab2',
        templateUrl: 'src/tab2.html'
      });
  }

})();
