# OBA Album Preview accessibility 

## Summary
Report on the accessibility of the OBA webapp that I made.

### Images

#### Context
The webapp uses besides images that are loaded by an API in the details page, only a png image for the 'click to scan' button on the homepage. SVG is used for everything else.

#### Tests
By disabling images in my browser, the image of the 'click to scan' button disappeared along with the images on the details page that are requested by the API.

#### Solution(s)
The image of the 'click to scan' button converted to a SVG since it should have been a SVG like the rest anyway. The images on the details page had already an alt tag so didn't change anything there.

### Custom Fonts

#### Context
The webapp uses the Open Sans font for all pages.

#### Tests
By disabling the custom font, the default sans-serif font of the browser will be used. 
While this is not a big issue since the Open Sans is a sans-serif font, 
it would be nicer to have a fallback that would look similar to Open Sans 
and not the default font of the browser that would cause the website to look different on different systems/browsers.

#### Solution(s)
Added the Verdana font family as fallback since it looks similar to Open Sans. The sans-serif is still used as the last fallback.

### Colors

#### Context
The webapp uses white and different shades of turquoise as colors.

#### Tests
Tested the website for the different types of color blindness:
- Protanopia
- Deuteranopia
- Tritanopia
- Monochromacy

There weren't any issues, because there is enough contrast between the colors.

#### Solution(s)
No solutions implemented since there weren't any issues.

### Bandwidth

#### Context
The webapp is a SPA and is built by using vanilla JavaScript, JavaScript libraries, CSS and SVG.

#### Tests
I used the Chrome developer tools to simulate a slow 3G network, while disabling cache.
It took 18.87 seconds for the browser to load all the required files and to render the homepage of the webapp.
All the required files were totally 222kb.

#### Solution(s)
It would have been a good idea to render the app server-side so that there can be optimizations.
For example, the webapp's JavaScript files and CSS files could be minified and compressed.
I would also like to add skeleton screens to improve perceived performance.

### Mouse/Trackpad

#### Context
The webapp is built for smartphones and has been tested for touch events only.

#### Tests
- The 'click to scan' button on the homepage worked with keyboard only, meaning that I could navigate to the next page.
Not surprisingly since the button is actually an a tag.
- The toggle flashlight button on the scan page doesn't work for keyboard since it's a SVG.
- Can't play tracks on the details page because the eventlistener is attached to a div and not a button.

#### Solution(s)
- Homepage already works, so I only added semantic html.
- Replaced the SVG toggle flashlight button on the scan page with a button. 
Toggling the flashlight button now also works with a keyboard.
- On the details page, I removed the eventlistener from the div and added it to the button. 
Tracks can now be started and stopped with a keyboard. 
I also added semantic tags on the page.

### Cookies
Didn't use cookies.

### Localstorage
Didn't use localstorage.