'use strict';

(function () {
  var mapFilters = document.querySelectorAll('.map__filters select');
  var fieldset = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapContainer = document.querySelector('.map__filters-container');
  var mapPins = document.getElementById('map__pins');
  var addForm = document.querySelector('.ad-form');
  var typeOfHouse = document.querySelector('#housing-type');
  var priceOfHouse = document.querySelector('#housing-price');
  var numberOfRooms = document.querySelector('#housing-rooms');
  var numberOfGuests = document.querySelector('#housing-guests');
  var featuresOfHouse = document.querySelector('#housing-features');
  var filterWifi = document.getElementById('filter-wifi');
  var filterDishwasher = document.getElementById('filter-dishwasher');
  var filterParking = document.getElementById('filter-parking');
  var filterWasher = document.getElementById('filter-washer');
  var filterElevator = document.getElementById('filter-elevator');
  var filterConditioner = document.getElementById('filter-conditioner');
  var offers = [];
  var mapOverlay = document.querySelector('.map__overlay');
  var mapPin = document.querySelector('.map__pin--main');
  var MapPinCoordinates = {
    LEFT: 570,
    TOP: 375
  };

  window.utils.addAttributeDisabled(fieldset);
  window.utils.addAttributeDisabled(mapFilters);

  var updatePins = function (array) {
    map.innerHTML = '';
    map.appendChild(mapPins);
    map.appendChild(mapContainer);
    var offersCopy = array.slice();

    if (typeOfHouse.value !== 'any') {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.type === typeOfHouse.value;
      });
    }

    switch (priceOfHouse.value) {
      case 'middle':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.price > 10000 && it.offer.price < 50000;
        });
        break;
      case 'low':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.price < 10000;
        });
        break;
      case 'high':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.price > 50000;
        });
        break;
      default:
        offersCopy = offersCopy.filter(function (it) {
          return it;
        });
    }

    switch (numberOfRooms.value) {
      case '1':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.rooms === 1;
        });
        break;
      case '2':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.rooms === 2;
        });
        break;
      case '3':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.rooms === 3;
        });
        break;
      default:
        offersCopy = offersCopy.filter(function (it) {
          return it;
        });
    }

    switch (numberOfGuests.value) {
      case '2':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.guests === 2;
        });
        break;
      case '1':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.guests === 1;
        });
        break;
      case '0':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.guests === 0;
        });
        break;
      default:
        offersCopy = offersCopy.filter(function (it) {
          return it;
        });
    }


    if (filterWifi.checked) {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.features.some(function (feature) {
          return feature === 'wifi';
        });
      });
    }

    if (filterDishwasher.checked) {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.features.some(function (feature) {
          return feature === 'dishwasher';
        });
      });
    }

    if (filterParking.checked) {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.features.some(function (feature) {
          return feature === 'parking';
        });
      });
    }

    if (filterWasher.checked) {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.features.some(function (feature) {
          return feature === 'washer';
        });
      });
    }

    if (filterElevator.checked) {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.features.some(function (feature) {
          return feature === 'elevator';
        });
      });
    }

    if (filterConditioner.checked) {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.features.some(function (feature) {
          return feature === 'conditioner';
        });
      });
    }

    window.renderPin(offersCopy);
  };

  var successHandler = function (data) {
    offers = data;
    updatePins(offers);
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

  var onFilterChange = window.debounce(function () {
    updatePins(offers);
  });

  window.main = {
    doActiveMode: function () {
      window.backend.load(successHandler, errorHandler);

      map.classList.remove('map--faded');

      window.utils.deleteAttributeDisabled(fieldset);

      addForm.classList.remove('ad-form--disabled');

      typeOfHouse.addEventListener('change', onFilterChange);

      priceOfHouse.addEventListener('change', onFilterChange);

      numberOfRooms.addEventListener('change', onFilterChange);

      numberOfGuests.addEventListener('change', onFilterChange);

      featuresOfHouse.addEventListener('change', onFilterChange);
    },
    doInactiveMode: function () {
      map.classList.add('map--faded');
      window.utils.addAttributeDisabled(fieldset);
      window.utils.addAttributeDisabled(mapFilters);
      addForm.classList.add('ad-form--disabled');
      mapPins.innerHTML = '';
      mapPins.appendChild(mapPin);
      mapPins.appendChild(mapOverlay);
      mapPin.addEventListener('mousedown', onPinMousedown);
      mapPin.addEventListener('keydown', onPinKeydown);
      mapPin.style.left = MapPinCoordinates.LEFT + 'px';
      mapPin.style.top = MapPinCoordinates.TOP + 'px';

      typeOfHouse.removeEventListener('change', onFilterChange);

      priceOfHouse.removeEventListener('change', onFilterChange);

      numberOfRooms.removeEventListener('change', onFilterChange);

      numberOfGuests.removeEventListener('change', onFilterChange);

      featuresOfHouse.removeEventListener('change', onFilterChange);
    }
  };

  mapPin.addEventListener('mousedown', onPinMousedown);
  mapPin.addEventListener('keydown', onPinKeydown);
})();
