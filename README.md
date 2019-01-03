# pallio
## animated lazy load images using IntersectionObserver
* based on [Craig Buckler](https://github.com/craigbuckler)'s [progressive-image.js](https://github.com/craigbuckler/progressive-image.js)
* a animated tiny version (10-20px) of the final image works as a placeholder and will be replaced as soon as the final image has been downloaded
* for devs who use and polyfill ```intersectionObserver``` in the rest of their site/app and like to have a small animation to make sure users see that something is happening and realize that the placeholder image is not the final one
* 1.35 KB CSS; 1.05 KB JS
* works with ```srcset``` and ```sizes```
* only works with ```img``` tag; ```picture``` and ```figure``` are not supported
* works in IE9 and higher; in IE9 the placeholder image will be replaced but no animation takes place
* in order to save CPU/GPU capacity, the animation is activated as soon as the placeholder image comes into view
* those who don't want to polyfill ```intersectionObserver``` or don't feel the need for an animated placeholder image, better use [progressive-image.js](https://github.com/craigbuckler/progressive-image.js)
* feedback on bugs, options to minimize the code or to make it more effecient is highly welcome; in order to keep it as lightweight as possible, it is not intended to add lots of new features

### Usage / Markup

* without ```srcset```, ```sizes``` and animation
```html
<a href="./finalImage.jpg"
   class="pallio pulse-inactive">
    <img src='./placeholderImage.jpg' class="preview" alt="image"/>
</a>
```

* without ```srcset``` and ```sizes```
```html
<a href="./finalImage.jpg"
   class="pallio">
    <div class="pulse-box">
      <div class="pulse"><div></div><div></div><div></div></div>
    </div> 
    <img src='./placeholderImage.jpg' class="preview" alt="image"/>
</a>
```
* using ```srcset```, ```sizes``` and animation
```html
<a href="./myImage768.jpg" 
   data-srcset="./myImage640.jpg 640w, ./myImage1366.jpg 1366w,./myImage1600.jpg 1600w, ./myImage1920.jpg 1920w"
   data-sizes="(min-width: 640px) 95vw" 
   class="pallio pulse-inactive">
    <div class="pulse-box">
      <div class="pulse"><div></div><div></div><div></div></div>
    </div> 
    <img src='./myImage10.jpg' class="preview" alt="image"/>
</a>
```
* the images ```'./myImage10.jpg'``` / ```'./placeholderImage.jpg'``` of the examples above are the placeholder which will be replaced. If a 10px wide version of the original image is used as placeholder, performance and visual effect is quite nice on most browsers; optionally ```filter(blur: 2vw)``` can be added
* for a smooth effect, the placeholder image and the original image(s) need the have the exact same aspect ratio - even small differences in the aspect ratio can disturb the visual effect

#### What's different to progressive-image.js?
* using the ```IntersectionObserver``` API without fallback - use [polyfill](https://github.com/w3c/IntersectionObserver) instead
* added pulse animation while image is loading in order to make sure the user realizes that there is something happening and the placeholder image is not the final one
* replaced ```classList``` with ```setAttribute``` for better browser compatibility / avoid another polyfill
* removed ```filter(blur: 2vw)``` since I experienced small delays on some mobile browsers
* added ```box-shadow``` that appears as soon as the loaded image appears
* removed unnessesary selectors
* restructured and rewritten to ES6/Airbnb and SCSS 
* removed everything else that doesn't fit my personal purpose

### Polyfills needed for broad browser compatibility (IE9 and higher)
* ```intersectionObserver```
* ```requestAnimationFrame```
* polyfill CSS depending on your needs
