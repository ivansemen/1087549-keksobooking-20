'use strict';

(function () {
  var QUANTITY = 8;
  var mapFilters = document.querySelectorAll('.map__filters select');
  var mapPin = document.querySelector('.map__pin--main');
  var fieldset = document.querySelectorAll('fieldset');
  var addForm = document.querySelector('.ad-form');
  var listElement = document.querySelector('.map__pins');
  var doActiveMode = function () {
    var successHandler = function (offers) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < QUANTITY; i++) {
        fragment.appendChild(window.pin.createPin(offers[i]));
      }
      listElement.appendChild(fragment);
    };

    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };


    window.backend.load(successHandler, errorHandler);

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
