'use strict';

(function () {
  var mapFilters = document.querySelectorAll('.map__filters select');
  var fieldset = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
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

  window.utils.addAttributeDisabled(fieldset);
  window.utils.addAttributeDisabled(mapFilters);

  var updatePins = function () {
    var sameTypeOfHouse = [];
    var samePriceOfHouse = [];
    var sameRoomsOfHouse = [];
    var sameGuestsOfHouse = [];

    switch (typeOfHouse.value) {
      case 'flat':
        sameTypeOfHouse = offers.filter(function (it) {
          return it.offer.type === 'flat';
        });
        break;
      case 'house':
        sameTypeOfHouse = offers.filter(function (it) {
          return it.offer.type === 'house';
        });
        break;
      case 'bungalo':
        sameTypeOfHouse = offers.filter(function (it) {
          return it.offer.type === 'bungalo';
        });
        break;
      case 'palace':
        sameTypeOfHouse = offers.filter(function (it) {
          return it.offer.type === 'palace';
        });
        break;
      default:
        sameTypeOfHouse = offers.filter(function (it) {
          return it;
        });

    }

    switch (priceOfHouse.value) {
      case 'middle':
        samePriceOfHouse = offers.filter(function (it) {
          return it.offer.price > 10000 && it.offer.price < 50000;
        });
        break;
      case 'low':
        samePriceOfHouse = offers.filter(function (it) {
          return it.offer.price < 10000;
        });
        break;
      case 'high':
        samePriceOfHouse = offers.filter(function (it) {
          return it.offer.price > 50000;
        });
        break;
      default:
        samePriceOfHouse = offers.filter(function (it) {
          return it;
        });
    }

    switch (numberOfRooms.value) {
      case '1':
        sameRoomsOfHouse = offers.filter(function (it) {
          return it.offer.rooms === 1;
        });
        break;
      case '2':
        sameRoomsOfHouse = offers.filter(function (it) {
          return it.offer.rooms === 2;
        });
        break;
      case '3':
        sameRoomsOfHouse = offers.filter(function (it) {
          return it.offer.rooms === 3;
        });
        break;
      default:
        sameRoomsOfHouse = offers.filter(function (it) {
          return it;
        });
    }

    switch (numberOfGuests.value) {
      case '2':
        sameGuestsOfHouse = offers.filter(function (it) {
          return it.offer.guests === 2;
        });
        break;
      case '1':
        sameGuestsOfHouse = offers.filter(function (it) {
          return it.offer.guests === 1;
        });
        break;
      case '0':
        sameGuestsOfHouse = offers.filter(function (it) {
          return it.offer.guests === 0;
        });
        break;
      default:
        sameGuestsOfHouse = offers.filter(function (it) {
          return it;
        });
    }

    if (filterWifi.checked) {
      var wifiFeature = offers.filter(function (it) {
        for (var i = 0; i < it.offer.features.length; i++) {
          if (it.offer.features[i] === 'wifi') {
            var wifiHouse = it;
          }
        }
        return wifiHouse;
      });
    } else {
      wifiFeature = offers.filter(function (it) {
        return it;
      });
    }

    if (filterDishwasher.checked) {
      var dishwasherFeature = offers.filter(function (it) {
        for (var i = 0; i < it.offer.features.length; i++) {
          if (it.offer.features[i] === 'dishwasher') {
            var dishwasherHouse = it;
          }
        }
        return dishwasherHouse;
      });
    } else {
      dishwasherFeature = offers.filter(function (it) {
        return it;
      });
    }

    if (filterParking.checked) {
      var parkingFeature = offers.filter(function (it) {
        for (var i = 0; i < it.offer.features.length; i++) {
          if (it.offer.features[i] === 'parking') {
            var parkingHouse = it;
          }
        }
        return parkingHouse;
      });
    } else {
      parkingFeature = offers.filter(function (it) {
        return it;
      });
    }

    if (filterWasher.checked) {
      var washerFeature = offers.filter(function (it) {
        for (var i = 0; i < it.offer.features.length; i++) {
          if (it.offer.features[i] === 'washer') {
            var washerHouse = it;
          }
        }
        return washerHouse;
      });
    } else {
      washerFeature = offers.filter(function (it) {
        return it;
      });
    }

    if (filterElevator.checked) {
      var elevatorFeature = offers.filter(function (it) {
        for (var i = 0; i < it.offer.features.length; i++) {
          if (it.offer.features[i] === 'elevator') {
            var elevatorHouse = it;
          }
        }
        return elevatorHouse;
      });
    } else {
      elevatorFeature = offers.filter(function (it) {
        return it;
      });
    }

    if (filterConditioner.checked) {
      var conditionerFeature = offers.filter(function (it) {
        for (var i = 0; i < it.offer.features.length; i++) {
          if (it.offer.features[i] === 'conditioner') {
            var conditionerHouse = it;
          }
        }
        return conditionerHouse;
      });
    } else {
      conditionerFeature = offers.filter(function (it) {
        return it;
      });
    }

    var filteredOffers = offers.filter(function (it) {
      for (var i = 0; i < sameTypeOfHouse.length; i++) {
        if (it === sameTypeOfHouse[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < samePriceOfHouse.length; i++) {
        if (it === samePriceOfHouse[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < sameRoomsOfHouse.length; i++) {
        if (it === sameRoomsOfHouse[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < sameGuestsOfHouse.length; i++) {
        if (it === sameGuestsOfHouse[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < wifiFeature.length; i++) {
        if (it === wifiFeature[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < dishwasherFeature.length; i++) {
        if (it === dishwasherFeature[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < parkingFeature.length; i++) {
        if (it === parkingFeature[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < washerFeature.length; i++) {
        if (it === washerFeature[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < elevatorFeature.length; i++) {
        if (it === elevatorFeature[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    }).filter(function (it) {
      for (var i = 0; i < conditionerFeature.length; i++) {
        if (it === conditionerFeature[i]) {
          var featuresOffers = it;
        }
      }
      return featuresOffers;
    });
    window.renderPin(filteredOffers);
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

  typeOfHouse.addEventListener('change', window.debounce(function () {
    updatePins();
  }));

  priceOfHouse.addEventListener('change', window.debounce(function () {
    updatePins();
  }));

  numberOfRooms.addEventListener('change', window.debounce(function () {
    updatePins();
  }));

  numberOfGuests.addEventListener('change', window.debounce(function () {
    updatePins();
  }));

  featuresOfHouse.addEventListener('change', window.debounce(function () {
    updatePins();
  }));
})();
