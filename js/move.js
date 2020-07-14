'use strict';

(function () {
  var mainPinHandler = document.querySelector('.map__pin--main');
  var YCoordinates = {
    MIN: 130,
    MAX: 630
  };
  var address = document.querySelector('#address');
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var body = document.querySelector('body');
  var x = mainPinHandler.offsetLeft + PinSize.WIDTH / 2;
  var y = mainPinHandler.offsetTop + PinSize.HEIGHT / 2;
  address.value = x + ', ' + y;
  var leftMap = body.offsetLeft - PinSize.WIDTH / 2;
  var rightMap = body.offsetLeft - PinSize.WIDTH / 2 + body.offsetWidth;

  mainPinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var offsetTopPin = mainPinHandler.offsetTop;
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      address.value = (mainPinHandler.offsetLeft - shift.x + PinSize.WIDTH / 2) + ', ' + (offsetTopPin - shift.y + PinSize.HEIGHT);

      if (offsetTopPin - shift.y > YCoordinates.MIN && offsetTopPin - shift.y < YCoordinates.MAX) {
        mainPinHandler.style.top = (offsetTopPin - shift.y) + 'px';
      } else if (offsetTopPin - shift.y < YCoordinates.MIN) {
        mainPinHandler.style.top = YCoordinates.MIN;
      } else if (offsetTopPin - shift.y > YCoordinates.MAX) {
        mainPinHandler.style.top = YCoordinates.MAX;
      }

      if (mainPinHandler.offsetLeft - shift.x > leftMap && mainPinHandler.offsetLeft - shift.x < rightMap) {
        mainPinHandler.style.left = (mainPinHandler.offsetLeft - shift.x) + 'px';
      } else if (mainPinHandler.offsetLeft - shift.x < leftMap) {
        mainPinHandler.style.left = leftMap;
      } else if (mainPinHandler.offsetLeft - shift.x > rightMap) {
        mainPinHandler.style.left = rightMap;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
