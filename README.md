# pallio
## Pulse animated lazy load images with IntersectionObserver
* based on [Craig Buckler](https://github.com/craigbuckler)'s [progressive-image.js](https://github.com/craigbuckler/progressive-image.js)

### Usage / Markup
```html
<a href='./myImage768.jpg' 
   data-srcset='./myImage640.jpg 640w, ./myImage1366.jpg 1366w,./myImage1600.jpg 1600w, ./myImage1920.jpg 1920w' 
   data-sizes="(min-width: 640px) 95vw" 
   class="pallio pulse-inactive">
    <div class="pulse-box">
      <div class="pulse"><div></div><div></div><div></div></div>
    </div> 
    <img src='./myImage10.jpg' class="preview" alt="image"/>
</a>
```
* the image ```'./myImage10.jpg'``` of the example above is the placeholder which will be replaced. If a 10px wide version of the original image is used as placeholder, performance and visual effects is quite nice on most browsers. Optionally ```filter(blur: 2vw)``` could be added. 
* For a smooth effect, the placeholder image and the original image(s) need the have the exact same aspect ratio - even small differences in the aspect ratio can disturb the visual effect. 

#### What's different to progressive-image.js?
* Using the ```IntersectionObserver``` API without fallback - use polyfill instead
* added pulse animation while image is loading
* replaced ```classList``` with ```setAttribute``` for better browser compatibility / avoid another polyfill
* removed ```filter(blur: 2vw)``` since I experienced small delays on some mobile browsers
* added ```box-shadow``` that appears as the loaded image is revealed
* removed unnessesary classes
* restructured and rewritten to ES6/Airbnb and SCSS
* removed everything else that doesn't fit my personal purpose

### Polyfills needed for broad browser compatibility (IE9 and higher)
* ```intersectionObserver```
* ```requestAnimationFrame```
