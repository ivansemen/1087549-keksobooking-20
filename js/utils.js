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
    },
    randomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    randomElement: function (array) {
      var elementOfArray = Math.floor(Math.random() * array.length);
      return array[elementOfArray];
    }
  };
})();
