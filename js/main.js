'use strict';

(function () {
  var mapFilters = document.querySelectorAll('.map__filters select');
  var fieldset = document.querySelectorAll('fieldset');

  window.utils.addAttributeDisabled(fieldset);
  window.utils.addAttributeDisabled(mapFilters);
})();
