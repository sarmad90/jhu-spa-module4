angular.module('MenuApp').component('itemsList', {
  template:`
    <h1>Hi from the component (Items)</h1>
    {{$ctrl.items}}
    <ul>
      <li ng-repeat="item in $ctrl.items.data.menu_items">
        {{ item.id }} of {{ item.name }}
      </li>
    </ul>
  `,
  bindings: {
    items: '<'
  }
});
