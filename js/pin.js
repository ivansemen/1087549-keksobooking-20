'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    createPin: function (pinOffers) {
      var pin = templatePin.cloneNode(true);
      pin.style.left = (pinOffers.location.x + PinSize.WIDTH / 2) + 'px';
      pin.style.top = (pinOffers.location.y + PinSize.HEIGHT / 2) + 'px';
      pin.querySelector('img').src = pinOffers.author.avatar;
      pin.querySelector('img').alt = pinOffers.offer.title;
      return pin;
    }
  };
})();
