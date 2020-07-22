'use strict';

(function () {
  window.utils = {
    addAttributeDisabled: function (collection) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].setAttribute('disabled', 'disabled');
      }
    },
    deleteAttributeDisabled: function (collection) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].removeAttribute('disabled');
      }
    }
  };
})();
