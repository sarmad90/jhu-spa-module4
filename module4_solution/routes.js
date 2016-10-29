(function(){
  angular.module('MenuApp').config(RoutesConfig);
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
      .state('categories', {
        url: '/categories',
        template: `
          <h2>Categories</h2>
          <categories-list categories="categoriesCtrl.categories"></categories>
        `,
        controller: 'CategoriesController as categoriesCtrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('home', {
        url: '/',
        template: `
          <h2>Welcome to our Restaurant</h2>
          <a ui-sref="categories" ui-sref-active="activeTab">Categories</a>
        `
      })


      .state('items', {
        url: '/categories/{categoryShortName}',
        template: `
        <h2>Items for Category</h2>
        <items-list items="itemsCtrl.items"></items>
        `,
        controller: 'ItemsController as itemsCtrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
  }

})();
