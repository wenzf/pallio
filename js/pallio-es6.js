// load image data in array
const images = [].slice.call(document.querySelectorAll('.pallio'));

// set configuration of IntersectionObserver
const config = {
  rootMargin: '0px 0px 5px 0px',
  threshold: 0,
};

// main function for lazy load images
const preloadImage = (item) => {
  // get animation frame for pulse animation
  requestAnimationFrame(() => {
    // image is in view -> remove '.pulse-inactive', activate pulse animation
    item.setAttribute('class', 'pallio');
  });

  // get href to add on new image
  const href = item && item.href;
  if (!href) return;

  // make new image
  const img = new Image();
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
  const addImg = () => {
    // destructuring item
    const itemDESTR = item;

    // getting animation frame for replacing image
    requestAnimationFrame(() => {
      // replace .pulse-inactive with .pulse-active
      item.setAttribute('class', 'pallio pulse-active');

      // disable click
      if (href === item.href) {
        itemDESTR.style.cursor = 'default';
        itemDESTR.addEventListener('click', (e) => { e.preventDefault(); }, false);
      }
      // getting preview image & pulse animation
      const pImg = item.querySelector && item.querySelector('.preview');
      const pBox = item.querySelector('.pulse-box');

      // add new image
      item.insertBefore(img, pImg && pImg.nextSibling).addEventListener('animationend', () => {
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
  if (img.complete) addImg();
  else img.onload = addImg;
};

// initialization and configuration of IntersectionObserver
const observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    requestAnimationFrame(() => { // <- maybe this one is too much!? double?!
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
images.forEach((image) => {
  observer.observe(image);
});
