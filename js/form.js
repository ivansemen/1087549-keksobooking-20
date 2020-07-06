'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

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

  roomNumber.addEventListener('change', function () {
    checkRoomNumberAndCapacity();
  });

  capacity.addEventListener('change', function () {
    checkRoomNumberAndCapacity();
  });
})();
