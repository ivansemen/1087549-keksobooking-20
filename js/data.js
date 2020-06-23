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
  var Price = {
    MIN_PRICE: 1000,
    MAX_PRICE: 50000
  };
  var CoordinateY = {
    FIRST_COORDINATE: 130,
    SECOND_COORDINATE: 630
  };
  var offsetWidth = document.querySelector('.map').offsetWidth;

  var createAvatar = function (number) {
    return 'img/avatars/user0' + number + '.png';
  };

  var offers = [];

  var createOffer = function () {
    var locationX = window.utils.randomNumber(0, offsetWidth);
    var locationY = window.utils.randomNumber(CoordinateY.FIRST_COORDINATE, CoordinateY.SECOND_COORDINATE);

    offers.push({
      'author': {
        'avatar': createAvatar(window.utils.randomNumber(1, 8))
      },
      'offer': {
        'title': window.utils.randomElement(TITLES),
        'address': locationX + ', ' + locationY,
        'price': window.utils.randomNumber(Price.MIN_PRICE, Price.MAX_PRICE),
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
  };

  window.data = {
    createOffers: function (offerNumber) {
      for (var i = 0; i < offerNumber; i++) {
        createOffer();
      }
      return offers;
    }
  };
})();
