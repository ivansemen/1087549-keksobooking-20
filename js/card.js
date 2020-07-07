'use strict';

(function () {
  var QUANTITY = 5;
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var createCard = function (cardOffers) {
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = cardOffers.offer.title;
    card.querySelector('.popup__text--address').textContent = cardOffers.offer.address;
    card.querySelector('.popup__text--price').innerHTML = '{{cardOffers.offer.price}}₽/ночь';
    card.querySelector('.popup__type').textContent = cardOffers.offer.type;
    card.querySelector('..popup__text--capacity').innerHTML = '{{cardOffers.offer.rooms}} комнаты для {{cardOffers.offer.guests}} гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}';
    card.querySelector('.popup__features').textContent = cardOffers.offer.features;
    card.querySelector('.popup__description').textContent = cardOffers.offer.description;
    card.querySelector('.popup__photos').src = cardOffers.offer.photos;
    card.querySelector('.popup__avatar').src = cardOffers.author.avatar;
    return card;
  };

  window.renderCard = function (data) {
    var takeNumber = data.length > QUANTITY ? QUANTITY : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createCard(data[i]));
    }

    map.appendChild(fragment);
  };
})();
