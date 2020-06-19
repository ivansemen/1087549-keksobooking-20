'use strict';

var QUANTITY = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 50000;
var PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};
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
var mapFilters = document.querySelectorAll('.map__filters select');
var fieldset = document.querySelectorAll('fieldset');
var mapPin = document.querySelector('.map__pin--main');
var addForm = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var addAttributeDisabled = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].setAttribute('disabled', 'disabled');
  }
};

var deleteAttributeDisabled = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].removeAttribute('disabled');
  }
};

addAttributeDisabled(fieldset);
addAttributeDisabled(mapFilters);

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

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var listElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var createPin = function (pinOffers) {
  var pin = templatePin.cloneNode(true);
  pin.style.left = (pinOffers.location.x + PinSize.WIDTH / 2) + 'px';
  pin.style.top = (pinOffers.location.y + PinSize.HEIGHT / 2) + 'px';
  pin.querySelector('img').src = pinOffers.author.avatar;
  pin.querySelector('img').alt = pinOffers.offer.title;
  return pin;
};

var doActiveMode = function () {
  var offers = createOffer(QUANTITY);
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createPin(offers[i]));
  }
  listElement.appendChild(fragment);


  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  deleteAttributeDisabled(fieldset);
  deleteAttributeDisabled(mapFilters);

  addForm.classList.remove('ad-form--disabled');
};


var onPinMousedown = function (evt) {
  if (evt.button === 0) {
    doActiveMode();
    mapPin.removeEventListener('mousedown', onPinMousedown);
    mapPin.removeEventListener('keydown', onPinKeydown);
  }
};

var onPinKeydown = function (evt) {
  if (evt.key === 'Enter') {
    doActiveMode();
  }
  mapPin.removeEventListener('keydown', onPinKeydown);
  mapPin.removeEventListener('mousedown', onPinMousedown);
};

mapPin.addEventListener('mousedown', onPinMousedown);
mapPin.addEventListener('keydown', onPinKeydown);

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


var getCoordinates = function () {
  var x = mapPin.offsetLeft + PinSize.WIDTH / 2;
  var y = mapPin.offsetTop + PinSize.HEIGHT / 2;
  address.value = x + ', ' + y;
};

getCoordinates();
