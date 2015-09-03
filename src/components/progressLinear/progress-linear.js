/**
 * @ngdoc module
 * @name material.components.progressLinear
 * @description Linear Progress module!
 */
angular.module('material.components.progressLinear', [
  'material.core'
])
  .directive('mdProgressLinear', MdProgressLinearDirective);

/**
 * @ngdoc directive
 * @name mdProgressLinear
 * @module material.components.progressLinear
 * @restrict E
 *
 * @description
 * The linear progress directive is used to make loading content
 * in your app as delightful and painless as possible by minimizing
 * the amount of visual change a user sees before they can view
 * and interact with content.
 *
 * Each operation should only be represented by one activity indicator
 * For example: one refresh operation should not display both a
 * refresh bar and an activity circle.
 *
 * For operations where the percentage of the operation completed
 * can be determined, use a determinate indicator. They give users
 * a quick sense of how long an operation will take.
 *
 * For operations where the user is asked to wait a moment while
 * something finishes up, and it’s not necessary to expose what's
 * happening behind the scenes and how long it will take, use an
 * indeterminate indicator.
 *
 * @param {string} md-mode Select from one of four modes: determinate, indeterminate, buffer or query.
 * @param {number=} value In determinate and buffer modes, this number represents the percentage of the primary progress bar. Default: 0
 * @param {number=} md-buffer-value In the buffer mode, this number represents the percentage of the secondary progress bar. Default: 0
 *
 * @usage
 * <hljs lang="html">
 * <md-progress-linear md-mode="determinate" value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="determinate" ng-value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="indeterminate"></md-progress-linear>
 *
 * <md-progress-linear md-mode="buffer" value="..." md-buffer-value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="query"></md-progress-linear>
 * </hljs>
 */
function MdProgressLinearDirective($$rAF, $mdConstant, $mdTheming, $mdUtil) {
  var MODE_DETERMINATE = "determinate",
      MODE_INDETERMINATE = "indeterminate",
      MODE_BUFFER = "buffer",
      MODE_QUERY = "query";

  return {
    restrict: 'E',
    template: '<div class="md-container">' +
      '<div class="md-dashed"></div>' +
      '<div class="md-bar md-bar1"></div>' +
      '<div class="md-bar md-bar2"></div>' +
      '</div>',
    compile: compile
  };
  
  function compile(tElement, tAttrs, transclude) {
    tElement.attr('aria-valuemin', 0);
    tElement.attr('aria-valuemax', 100);
    tElement.attr('role', 'progressbar');

    return postLink;
  }
  function postLink(scope, element, attr) {
    $mdTheming(element);
    var lastMode, toVendorCSS = $mdUtil.dom.animator.toCss;
    var bar1 = angular.element(element[0].querySelector('.md-bar1')),
        bar2 = angular.element(element[0].querySelector('.md-bar2')),
        container = angular.element(element[0].querySelector('.md-container'));

    attr.$observe('value', function(value) {
      var percentValue = clamp(value);
      element.attr('aria-valuenow', percentValue);

      animateIndicator(bar2, percentValue);
    });

    attr.$observe('mdBufferValue', function(value) {
      animateIndicator(bar1, clamp(value));
    });

    attr.$observe('mdMode',function(mode){
      switch( mode ) {
        case MODE_QUERY:
        case MODE_BUFFER:
        case MODE_DETERMINATE:
        case MODE_INDETERMINATE:
          container.removeClass('ng-hide');

          // Inject class selector instead of attribute selector
          // (@see layout.js changes for IE performance issues)

          if ( lastMode ) container.removeClass( lastMode );
               lastMode = "md-mode-" + mode;
          if ( lastMode ) container.addClass( lastMode );

          break;
        default:
          container.addClass('ng-hide');
          if ( lastMode ) {
            container.removeClass( lastMode );
            lastMode = undefined;
          }
          break;
      }
    });

    function mode() {
      var value = attr.mdMode;
      if ( value ) {
        switch(value) {
          case MODE_DETERMINATE:
          case MODE_INDETERMINATE:
          case MODE_BUFFER:
          case MODE_QUERY:
            break;
          default:
            value = undefined;
            break;
        }
      }
      return value;
    }

    /**
     * Manually set CSS to animate the Determinate indicator based on the specified
     * percentage value (0-100).
     */
    function animateIndicator(target, value) {
      if ( !mode() ) return;

      var to = $mdUtil.supplant("translateX({0}%) scale({1},1)", [ (value-100)/2, value/100 ]);
      var styles = toVendorCSS({ transform : to });
      angular.element(target).css( styles );
    }
  }

  /**
   * Clamps the value to be between 0 and 100.
   * @param {number} value The value to clamp.
   * @returns {number}
   */
  function clamp(value) {
    return Math.max(0, Math.min(value || 0, 100));
  }
}

