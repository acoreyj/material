angular
    .module('material.components.chips')
    .directive('mdContactChipsAutocompleteScope', MdContactChipsAutocompleteScope);

function MdContactChipsAutocompleteScope ($compile, $mdUtil) {
  return {
    restrict: 'A',
    link:     postLink,
    scope:    false
  };

  function postLink (scope, element, attr) {
    // Since the autocomplete popup is appended to the body, we cannot traverse up the DOM looking
    // for the proper controller and grabbing it's scope, so we must go WAY up to get the proper
    // scope; create a new child scope based off of the parent, and copy the item over on changes
    var newScope = scope.$parent.$parent.$parent.$new();

    // Watch for changes to the scope's item and copy it to the new scope
    scope.$watch('item', function(item) {
      $mdUtil.nextTick(function() {
        newScope.item = item;
      });
    });

    // TODO: transclude self might make it possible to do this without
    // re-compiling, which is slow.
    $compile(element.contents())(newScope);
  }
}
