// load image data in array
var images = [].slice.call(document.querySelectorAll('.pallio'));

// set configuration of IntersectionObserver
var config = {
  rootMargin: '0px 0px 5px 0px',
  threshold: 0
};

// main function for lazy load images
var preloadImage = function preloadImage(item) {
  // get animation frame for pulse animation
  requestAnimationFrame(function () {
    // image is in view -> remove '.pulse-inactive', activate pulse animation
    item.setAttribute('class', 'pallio');
  });

  // get href to add on new image
  var href = item && item.href;
  if (!href) return;

  // make new image
  var img = new Image();
  if (item.dataset) {
    // add srcset & sizes to new image - if any available
    img.srcset = item.dataset.srcset || '';
    img.sizes = item.dataset.sizes || '';
  }
  // add src to new image
  img.src = href;

  // add .reveal to new image
  img.setAttribute('class', 'reveal');

  // function to replace image and destroy preview image
  var addImg = function addImg() {
    // destructuring item
    var itemDESTR = item;

    // getting animation frame for replacing image
    requestAnimationFrame(function () {
      // replace .pulse-inactive with .pulse-active
      item.setAttribute('class', 'pallio pulse-active');

      // disable click
      if (href === item.href) {
        itemDESTR.style.cursor = 'default';
        itemDESTR.addEventListener('click', function (e) {
          e.preventDefault();
        }, false);
      }
      // getting preview image & pulse animation
      var pImg = item.querySelector && item.querySelector('.preview');
      var pBox = item.querySelector('.pulse-box');

      // add new image
      item.insertBefore(img, pImg && pImg.nextSibling).addEventListener('animationend', function () {
        // remove preview image
        if (pImg) {
          // add alt text to new image
          img.alt = pImg.alt || '';

          // destroy preview image and animation
          item.removeChild(pImg);
          item.removeChild(pBox);
        }

        // destroy unnecessary classes
        img.removeAttribute('class', 'reveal');
        itemDESTR.setAttribute('class', 'pallio');
        // optional: add another class to finished image:
        // itemDESTR.setAttribute('class', 'allis justanotherclassname');
      });
    });
  };

  // run function if new image has finsihed loading
  if (img.complete) addImg();else img.onload = addImg;
};

// initialization and configuration of IntersectionObserver
var observer = new IntersectionObserver(function (entries, self) {
  entries.forEach(function (entry) {
    requestAnimationFrame(function () {
      // <- maybe this one is too much!? double?!
      // observe whether image is in view
      if (entry.isIntersecting) {
        preloadImage(entry.target);

        // unobserve afterwards
        self.unobserve(entry.target);
      }
    });
  });
}, config);

// observe all images
images.forEach(function (image) {
  observer.observe(image);
});
