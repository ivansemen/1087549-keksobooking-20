'use strict';

(function () {
  var mapFilters = document.querySelectorAll('.map__filters select');
  var fieldset = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var addForm = document.querySelector('.ad-form');
  var typeOfHouse = document.querySelector('#housing-type');
  var offers = [];
  var mapOverlay = document.querySelector('.map__overlay');
  var mapPin = document.querySelector('.map__pin--main');

  window.utils.addAttributeDisabled(fieldset);
  window.utils.addAttributeDisabled(mapFilters);

  var renderTypeOfHouse = function () {
    var filterTypeOfHouse = [];
    switch (typeOfHouse.value) {
      case 'flat':
        filterTypeOfHouse = offers.filter(function (it) {
          return it.offer.type === 'flat';
        });
        break;
      case 'house':
        filterTypeOfHouse = offers.filter(function (it) {
          return it.offer.type === 'house';
        });
        break;
      case 'bungalo':
        filterTypeOfHouse = offers.filter(function (it) {
          return it.offer.type === 'bungalo';
        });
        break;
      case 'palace':
        filterTypeOfHouse = offers.filter(function (it) {
          return it.offer.type === 'palace';
        });
        break;
      default:
        filterTypeOfHouse = offers.filter(function (it) {
          return it;
        });
    }
    window.renderPin(filterTypeOfHouse);
  };

  var updatePins = function () {
    renderTypeOfHouse();
  };

  var successHandler = function (data) {
    offers = data;
    updatePins();
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

  var onPinMousedown = function (evt) {
    if (evt.button === 0) {
      window.main.doActiveMode();
      mapPin.removeEventListener('mousedown', onPinMousedown);
      mapPin.removeEventListener('keydown', onPinKeydown);
    }
  };

  var onPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      window.main.doActiveMode();
    }
    mapPin.removeEventListener('keydown', onPinKeydown);
    mapPin.removeEventListener('mousedown', onPinMousedown);
  };

  window.main = {
    doActiveMode: function () {
      window.backend.load(successHandler, errorHandler);

      map.classList.remove('map--faded');

      window.utils.deleteAttributeDisabled(fieldset);

      addForm.classList.remove('ad-form--disabled');
    },
    doInactiveMode: function () {
      map.classList.add('map--faded');
      window.utils.addAttributeDisabled(fieldset);
      window.utils.addAttributeDisabled(mapFilters);
      addForm.classList.add('ad-form--disabled');
      var mapPins = document.getElementById('map__pins');
      mapPins.innerHTML = '';
      mapPins.appendChild(mapPin);
      mapPins.appendChild(mapOverlay);
      mapPin.addEventListener('mousedown', onPinMousedown);
      mapPin.addEventListener('keydown', onPinKeydown);
    }
  };

  mapPin.addEventListener('mousedown', onPinMousedown);
  mapPin.addEventListener('keydown', onPinKeydown);

  typeOfHouse.addEventListener('change', function () {
    updatePins();
  });
})();
