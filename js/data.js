'use strict';
(function () {
  var TITLES = ['Заголовок_1', 'Заголовок_2', 'Заголовок_3',
    'Заголовок_4', 'Заголовок_5', 'Заголовок_6', 'Заголовок_7', 'Заголовок_8'
  ];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3];
  var GUESTS = [1, 2, 'Любое число гостей'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = ['Описание_1', 'Описание_2', 'Описание_3', 'Описание_4',
    'Описание_5', 'Описание_6', 'Описание_7', 'Описание_8'
  ];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 50000;
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var offsetWidth = document.querySelector('.map').offsetWidth;

  var createAvatar = function (number) {
    var avatar = 'img/avatars/user0' + number + '.png';
    return avatar;
  };
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var listElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  window.data = {
    createOffer: function (offerNumber) {
      var offers = [];
      for (var i = 0; i < offerNumber; i++) {
        var locationX = window.utils.randomNumber(0, offsetWidth);
        var locationY = window.utils.randomNumber(130, 630);

        offers.push({
          'author': {
            'avatar': createAvatar(window.utils.randomNumber(1, 8))
          },
          'offer': {
            'title': window.utils.randomElement(TITLES),
            'address': locationX + ', ' + locationY,
            'price': window.utils.randomNumber(MIN_PRICE, MAX_PRICE),
            'type': window.utils.randomElement(TYPES),
            'rooms': window.utils.randomElement(ROOMS),
            'guests': window.utils.randomElement(GUESTS),
            'checkin': window.utils.randomElement(CHECKIN),
            'checkout': window.utils.randomElement(CHECKOUT),
            'features': window.utils.randomElement(FEATURES),
            'description': window.utils.randomElement(DESCRIPTION),
            'photos': window.utils.randomElement(PHOTOS)
          },
          'location': {
            'x': locationX,
            'y': locationY
          }
        });
      }
      return offers;
    },
    listElement: listElement,
    fragment: fragment,
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
