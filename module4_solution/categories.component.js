(function(){
  angular.module('MenuApp').component('categoriesList', {
    template: `
      <ul>
        <li ng-repeat="category in $ctrl.categories.data">
          <a ui-sref="items({categoryShortName: category.short_name})" ui-sref-active="activeTab">{{ category.name }}</a>
        </li>
      </ul>
    `,
    bindings: {
      categories: '<'
    }
  });
})();
