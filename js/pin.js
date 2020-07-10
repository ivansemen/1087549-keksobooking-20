'use strict';

(function () {
  var QUANTITY = 5;
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');


  var createPin = function (pinOffers) {
    var pin = templatePin.cloneNode(true);
    pin.style.left = (pinOffers.location.x + PinSize.WIDTH / 2) + 'px';
    pin.style.top = (pinOffers.location.y + PinSize.HEIGHT / 2) + 'px';
    pin.querySelector('img').src = pinOffers.author.avatar;
    pin.querySelector('img').alt = pinOffers.offer.title;

    pin.addEventListener('click', function () {
      window.renderCard(pinOffers);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        window.renderCard(pinOffers);
      }
    });
    return pin;
  };

  window.renderPin = function (data) {
    var takeNumber = data.length > QUANTITY ? QUANTITY : data.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createPin(data[i]));
    }

    var listElement = document.getElementById('map__pins');
    var mapPin = document.querySelector('.map__pin--main');
    listElement.innerHTML = '';
    fragment.appendChild(mapPin);
    listElement.appendChild(fragment);
  };
})();
