(function(){
  var MenuApp = angular.module('MenuApp', []);
  NarrowItDownApp.controller('NarrowItDownController', NarrowItDownController);
  NarrowItDownApp.service('MenuSearchService', MenuSearchService);
  NarrowItDownApp.directive('foundItems', FoundItems);
  NarrowItDownApp.directive('itemsLoaderIndicator', ItemsLoaderIndicator);

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService){
    var thisController = this;

    thisController.searchTerm = "";
    thisController.found = [];
    thisController.loading = false;
    thisController.search = function(){
      thisController.loading = true;
      thisController.found = [];
      MenuSearchService.getMatchedMenuItems(thisController.searchTerm).then(function(result){
        if(thisController.searchTerm != ""){
          thisController.found = result;  
        }
        thisController.loading = false;
      });
    };
    thisController.removeItem = function(index){
      thisController.found.splice(index, 1);
    };
  };

  MenuSearchService.$inject = ["$http"];
  function MenuSearchService($http){
    var thisService = this;

    thisService.allMenuItems = [];
    thisService.found = [];

    thisService.getMatchedMenuItems = function(searchTerm){
        return thisService.getAllMenuItems().then(function(result){
          thisService.found = filter(searchTerm, thisService.allMenuItems);
          return thisService.found;
        }); 
      
    };

    thisService.getAllMenuItems = function(){

      return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json', {cache: true}).then(function (result) {
        thisService.allMenuItems = result.data.menu_items;

        // return processed items
        return thisService.allMenuItems;
      });

    };

  };

  function filter(searchTerm, allMenuItems){
    // process result and only keep items that match
    var foundItems = []
    for (var i = 0; i < allMenuItems.length; i++) {
      if(allMenuItems[i].description.indexOf(searchTerm) > -1){
        foundItems.push(allMenuItems[i]);
      }
    }
    return foundItems;
  };

  function FoundItems(){
    var ddo = {
      scope: {
        found: '=arr',
        onRemove: '&'
      },
      template: "<p ng-repeat='item in found'><b>#:</b>{{$index+1}},<b>Short Name:</b> {{item.short_name}} , <b>Name:</b> {{ item.name }}, <b>Description:</b> {{ item.description }}. <button ng-click='onRemove({index: $index});'>Don't want this one!</button></p><br><br><p style='float: left;' ng-hide='found.length'>Nothing found</p>"
    }

    return ddo;
  }

  function ItemsLoaderIndicator(){
    var ddo = {
      template: "<div class='loader'>Loading...</div>"
    }

    return ddo;
  }

})();
