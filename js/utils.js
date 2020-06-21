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
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    randomElement: function (array) {
      var elementOfArray = Math.floor(Math.random() * array.length);
      return array[elementOfArray];
    }
  };
})();
