'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var typeOfRoom = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorButton = document.querySelector('#error').content.querySelector('.error__button');
  var successMessage = successTemplate.cloneNode(true);
  var errorMessage = errorTemplate.cloneNode(true);
  var buttonReset = document.querySelector('.ad-form__reset');


  var checkRoomNumberAndCapacity = function () {
    if (roomNumber.value === '1' && capacity.value !== '1') {
      roomNumber.setCustomValidity('1 комната — «для 1 гостя»');
      roomNumber.reportValidity();
    } else if (roomNumber.value === '2' && !(capacity.value === '1' || capacity.value === '2')) {
      roomNumber.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
      roomNumber.reportValidity();
    } else if (roomNumber.value === '3' && capacity.value === '0') {
      roomNumber.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      roomNumber.reportValidity();
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      roomNumber.setCustomValidity('100 комнат — «не для гостей»');
      roomNumber.reportValidity();
    } else {
      roomNumber.setCustomValidity('');
      roomNumber.reportValidity();
    }
  };

  var checkTypeOfRoomAndPrice = function () {
    switch (typeOfRoom.value) {
      case 'bungalo':
        price.setAttribute('min', '0');
        price.placeholder = '0';
        break;
      case 'flat':
        price.setAttribute('min', '1000');
        price.placeholder = '1000';
        break;
      case 'house':
        price.setAttribute('min', '5000');
        price.placeholder = '5000';
        break;
      case 'palace':
        price.setAttribute('min', '10000');
        price.placeholder = '10000';
        break;
    }
  };

  roomNumber.addEventListener('change', function () {
    checkRoomNumberAndCapacity();
  });

  capacity.addEventListener('change', function () {
    checkRoomNumberAndCapacity();
  });

  typeOfRoom.addEventListener('change', function () {
    checkTypeOfRoomAndPrice();
  });

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  var successHandler = function () {
    var mainPin = document.querySelector('.map__pin--main');
    var address = document.querySelector('#address');
    var PinSize = {
      WIDTH: 50,
      HEIGHT: 70
    };
    body.appendChild(successMessage);
    form.reset();
    var x = mainPin.offsetLeft + PinSize.WIDTH / 2;
    var y = mainPin.offsetTop + PinSize.HEIGHT / 2;
    address.value = x + ', ' + y;
    window.main.doInactiveMode();

    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', closeMessage);
  };

  var closeMessage = function () {
    body.removeChild(successMessage);

    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', closeMessage);
  };

  var onErrorMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  var errorHandler = function () {
    main.appendChild(errorMessage);

    document.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', onErrorMessageEscPress);
    errorButton.addEventListener('click', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    main.removeChild(errorMessage);

    document.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('keydown', onErrorMessageEscPress);
    errorButton.removeEventListener('click', closeErrorMessage);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  var resetForm = function () {
    form.reset();
    buttonReset.removeEventListener('click', resetForm);
  };

  buttonReset.addEventListener('click', resetForm);
})();
