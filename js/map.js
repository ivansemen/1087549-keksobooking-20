'use strict';

(function () {
  var QUANTITY = 8;
  var mapFilters = document.querySelectorAll('.map__filters select');
  var mapPin = document.querySelector('.map__pin--main');
  var fieldset = document.querySelectorAll('fieldset');
  var addForm = document.querySelector('.ad-form');
  var listElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var doActiveMode = function () {
    var offers = window.data.createOffers(QUANTITY);
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.createPin(offers[i]));
    }
    listElement.appendChild(fragment);


    var map = document.querySelector('.map');
    map.classList.remove('map--faded');

    window.utils.deleteAttributeDisabled(fieldset);
    window.utils.deleteAttributeDisabled(mapFilters);

    addForm.classList.remove('ad-form--disabled');
  };

  var onPinMousedown = function (evt) {
    if (evt.button === 0) {
      doActiveMode();
      mapPin.removeEventListener('mousedown', onPinMousedown);
      mapPin.removeEventListener('keydown', onPinKeydown);
    }
  };

  var onPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      doActiveMode();
    }
    mapPin.removeEventListener('keydown', onPinKeydown);
    mapPin.removeEventListener('mousedown', onPinMousedown);
  };

  mapPin.addEventListener('mousedown', onPinMousedown);
  mapPin.addEventListener('keydown', onPinKeydown);
})();
