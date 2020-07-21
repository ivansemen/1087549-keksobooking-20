'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  var createPhoto = function (preview, reader) {
    var photo = document.createElement('img');
    photo.setAttribute('width', '70');
    photo.setAttribute('height', '70');
    preview.insertBefore(photo, null);
    photo.src = reader.result;
  };

  var checkImage = function (file) {
    var isCorrectExtension = FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
    return isCorrectExtension;
  };

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];

    if (checkImage(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  fileChooserPhoto.addEventListener('change', function () {
    var file = fileChooserPhoto.files[0];

    if (checkImage(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (previewPhoto.children.length === 0) {
          createPhoto(previewPhoto, reader);
        } else {
          var photoOfHouse = previewPhoto.cloneNode();
          photoContainer.appendChild(photoOfHouse);
          createPhoto(photoOfHouse, reader);
        }
      });

      reader.readAsDataURL(file);
    }
  });
})();
