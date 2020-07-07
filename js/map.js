'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var fieldset = document.querySelectorAll('fieldset');
  var addForm = document.querySelector('.ad-form');
  var offers = [];
  var typeOfHouse = document.querySelector('#housing-type');


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


  var doActiveMode = function () {
    window.backend.load(successHandler, errorHandler);

    var map = document.querySelector('.map');
    map.classList.remove('map--faded');

    window.utils.deleteAttributeDisabled(fieldset);

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

  typeOfHouse.addEventListener('change', function () {
    updatePins();
  });
})();
