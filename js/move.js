'use strict';

(function () {
  var mainPinHandler = document.querySelector('.map__pin--main');
  var Y = {
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

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      address.value = (mainPinHandler.offsetLeft - shift.x + PinSize.WIDTH / 2) + ', ' + (mainPinHandler.offsetTop - shift.y + PinSize.HEIGHT);

      if (mainPinHandler.offsetTop - shift.y > Y.MIN && mainPinHandler.offsetTop - shift.y < Y.MAX) {
        mainPinHandler.style.top = (mainPinHandler.offsetTop - shift.y) + 'px';
      } else if (mainPinHandler.offsetTop - shift.y < Y.MIN) {
        mainPinHandler.style.top = Y.MIN;
      } else if (mainPinHandler.offsetTop - shift.y > Y.MAX) {
        mainPinHandler.style.top = Y.MAX;
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

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPinHandler.removeEventListener('click', onClickPreventDefault);
        };
        mainPinHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
