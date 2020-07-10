'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var typeOfRoom = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

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

})();
