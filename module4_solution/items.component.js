(function(){
  angular.module('MenuApp').component('itemsList', {
    template:`
      <a ui-sref="categories" ui-sref-active="activeTab">Back</a>
      <ul>
        <li ng-repeat="item in $ctrl.items.data.menu_items">
          {{ item.name }} (Id: {{ item.id }})
        </li>
      </ul>
    `,
    bindings: {
      items: '<'
    }
  });
})();
