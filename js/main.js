'use strict';

var QUANTITY = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 50000;
var PIN_SIZE = [50, 70];
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
var offsetWidth = document.querySelector('.map').offsetWidth;

var randomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var randomElement = function (array) {
  var elementOfArray = Math.floor(Math.random() * array.length);
  return array[elementOfArray];
};

var createAvatar = function (number) {
  var avatar = 'img/avatars/user0' + number + '.png';
  return avatar;
};

var createOffer = function (offerNumber) {
  var offers = [];
  for (var i = 0; i < offerNumber; i++) {
    var locationX = randomNumber(0, offsetWidth);
    var locationY = randomNumber(130, 630);

    offers.push({
      'author': {
        'avatar': createAvatar(randomNumber(1, 8))
      },
      'offer': {
        'title': randomElement(TITLES),
        'address': locationX + ', ' + locationY,
        'price': randomNumber(MIN_PRICE, MAX_PRICE),
        'type': randomElement(TYPES),
        'rooms': randomElement(ROOMS),
        'guests': randomElement(GUESTS),
        'checkin': randomElement(CHECKIN),
        'checkout': randomElement(CHECKOUT),
        'features': randomElement(FEATURES),
        'description': randomElement(DESCRIPTION),
        'photos': randomElement(PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return offers;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var offers = createOffer(QUANTITY);

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var listElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var createPin = function (pinOffers) {
  var pin = templatePin.cloneNode(true);
  pin.style = 'left: ' + (pinOffers.location.x + PIN_SIZE[0] / 2) + 'px; top: ' + (pinOffers.location.y + PIN_SIZE[1] / 2) + 'px;';
  pin.querySelector('img').src = pinOffers.author.avatar;
  pin.querySelector('img').alt = pinOffers.offer.title;
  return pin;
};

for (var i = 0; i < offers.length; i++) {
  fragment.appendChild(createPin(offers[i]));
}
listElement.appendChild(fragment);
