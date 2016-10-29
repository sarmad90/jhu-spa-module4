angular.module('MenuApp').component('categoriesList', {
  template: `
    <h1>Hi from the component (Categories)</h1>
    <ul>
      <li ng-repeat="category in $ctrl.categories.data">
        {{ category.id }} of {{ category.name }}
      </li>
    </ul>
  `,
  bindings: {
    categories: '<'
  }
});
