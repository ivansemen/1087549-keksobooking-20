'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.getElementById('map__pins');
  var mapContainer = document.querySelector('.map__filters-container');
  var typeOfHouse = document.querySelector('#housing-type');
  var priceOfHouse = document.querySelector('#housing-price');
  var numberOfRooms = document.querySelector('#housing-rooms');
  var numberOfGuests = document.querySelector('#housing-guests');
  var filterWifi = document.getElementById('filter-wifi');
  var filterDishwasher = document.getElementById('filter-dishwasher');
  var filterParking = document.getElementById('filter-parking');
  var filterWasher = document.getElementById('filter-washer');
  var filterElevator = document.getElementById('filter-elevator');
  var filterConditioner = document.getElementById('filter-conditioner');


  window.updatePins = function (array) {
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
          return it.offer.price <= 10000;
        });
        break;
      case 'high':
        offersCopy = offersCopy.filter(function (it) {
          return it.offer.price >= 50000;
        });
        break;
      default:
        offersCopy = offersCopy.filter(function (it) {
          return it;
        });
    }

    if (numberOfRooms.value !== 'any') {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.rooms === Number(numberOfRooms.value);
      });
    }

    if (numberOfGuests.value !== 'any') {
      offersCopy = offersCopy.filter(function (it) {
        return it.offer.guests === Number(numberOfGuests.value);
      });
    }

    var filterByFeature = function (offersArr, featureForFiltering) {
      return offersArr.filter(function (it) {
        return it.offer.features.some(function (feature) {
          return feature === featureForFiltering;
        });
      });
    };

    if (filterWifi.checked) {
      offersCopy = filterByFeature(offersCopy, 'wifi');
    }

    if (filterDishwasher.checked) {
      offersCopy = filterByFeature(offersCopy, 'dishwasher');
    }

    if (filterParking.checked) {
      offersCopy = filterByFeature(offersCopy, 'parking');
    }

    if (filterWasher.checked) {
      offersCopy = filterByFeature(offersCopy, 'washer');
    }

    if (filterElevator.checked) {
      offersCopy = filterByFeature(offersCopy, 'elevator');
    }

    if (filterConditioner.checked) {
      offersCopy = filterByFeature(offersCopy, 'conditioner');
    }

    window.renderPin(offersCopy);
  };
})();
