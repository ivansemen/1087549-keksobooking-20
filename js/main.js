'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var mapFilters = document.querySelectorAll('.map__filters select');
  var fieldset = document.querySelectorAll('fieldset');
  var mapPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  window.utils.addAttributeDisabled(fieldset);
  window.utils.addAttributeDisabled(mapFilters);


  var getCoordinates = function () {
    var x = mapPin.offsetLeft + PinSize.WIDTH / 2;
    var y = mapPin.offsetTop + PinSize.HEIGHT / 2;
    address.value = x + ', ' + y;
  };

  getCoordinates();
})();
