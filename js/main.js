'use strict';

(function () {
  var mapFilters = document.querySelectorAll('.map__filters select');
  var filterForm = document.querySelector('.map__filters');
  var fieldset = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapPins = document.getElementById('map__pins');
  var addForm = document.querySelector('.ad-form');
  var offers = [];
  var mapOverlay = document.querySelector('.map__overlay');
  var mapPin = document.querySelector('.map__pin--main');
  var typeOfHouse = document.querySelector('#housing-type');
  var priceOfHouse = document.querySelector('#housing-price');
  var numberOfRooms = document.querySelector('#housing-rooms');
  var numberOfGuests = document.querySelector('#housing-guests');
  var featuresOfHouse = document.querySelector('#housing-features');
  var address = document.querySelector('#address');
  var buttonReset = document.querySelector('.ad-form__reset');
  var form = document.querySelector('.ad-form');
  var avatarPreviewSrc = 'img/muffin-grey.svg';

  var MapPinCoordinates = {
    LEFT: 595,
    TOP: 410
  };

  window.utils.addAttributeDisabled(fieldset);
  window.utils.addAttributeDisabled(mapFilters);

  var successHandler = function (data) {
    offers = data;
    window.updatePins(offers);
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
    window.updatePins(offers);
  });

  var resetForm = function () {
    form.reset();
    window.main.doInactiveMode();
    buttonReset.removeEventListener('click', resetForm);
  };

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

      buttonReset.addEventListener('click', resetForm);
    },
    doInactiveMode: function () {
      var photoContainer = document.querySelector('.ad-form__photo-container');
      var previewPhoto = document.querySelector('.ad-form__photo');
      var fileChooserPhoto = document.querySelector('.ad-form__upload');
      var previewAvatar = document.querySelector('.ad-form-header__preview img');
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
      address.value = MapPinCoordinates.LEFT + ', ' + MapPinCoordinates.TOP;
      filterForm.reset();
      previewAvatar.src = avatarPreviewSrc;

      photoContainer.innerHTML = '';
      previewPhoto.innerHTML = '';
      photoContainer.appendChild(fileChooserPhoto);
      photoContainer.appendChild(previewPhoto);

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
