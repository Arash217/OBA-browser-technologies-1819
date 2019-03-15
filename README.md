# OBA Album Preview accessibility 

## Summary
Report on the accessibility of the OBA webapp that I made.

### Features

#### Images

##### Context
The webapp uses besides images that are loaded by an API in the details page, only a png image for the 'click to scan' button on the homepage. SVG is used for everything else.

##### Tests
By disabling images in my browser, the image of the 'click to scan' button disappeared along with the images on the details page that are requested by the API.

##### Solution(s)
The image of the 'click to scan' button converted to a SVG since it should have been a SVG like the rest anyway. The images on the details page had already an alt tag so didn't change anything there.

#### Custom Fonts

##### Context
The webapp uses the Open Sans font for all pages.

##### Tests
By disabling the custom font, the default sans-serif font of the browser will be used. 
While this is not a big issue since the Open Sans is a sans-serif font, 
it would be nicer to have a fallback that would look similar to Open Sans 
and not the default font of the browser that would cause the website to look different on different systems/browsers.

##### Solution(s)
Added the Verdana font family as fallback since it looks similar to Open Sans. The sans-serif is still used as the last fallback.

#### Colors

##### Context
The webapp uses white and different shades of turquoise as colors.

##### Tests
Tested the website for the different types of color blindness:
- Protanopia
- Deuteranopia
- Tritanopia
- Monochromacy

There weren't any issues, because there is enough contrast between the colors.

##### Solution(s)
No solutions implemented, because there weren't any issues.

#### Bandwidth

##### Context
The webapp is a SPA and is built by using vanilla JavaScript, JavaScript libraries, CSS and SVG.

##### Tests
I used the Chrome developer tools to simulate a slow 3G network, while disabling cache.
It took 18.87 seconds for the browser to load all the required files and to render the homepage of the webapp.
All the required files were totally 222kb.

##### Solution(s)
It would have been a good idea to render the app server-side so that there can be optimizations.
For example, the webapp's JavaScript files and CSS files could be minified and compressed.
I would also like to add skeleton screens to improve perceived performance.

#### Mouse/Trackpad

##### Context
The webapp is built for smartphones and has been tested for touch events only.

##### Tests
- The 'click to scan' button on the homepage worked with keyboard only, meaning that I could navigate to the next page.
Not surprisingly since the button is actually an a tag.
- The toggle flashlight button on the scan page doesn't work for keyboard since it's a SVG.
- Can't play tracks on the details page because the eventlistener is attached to a div and not a button.

##### Solution(s)
- Homepage already works, so I only added semantic html.
- Replaced the SVG toggle flashlight button on the scan page with a button. 
Toggling the flashlight button now also works with a keyboard.
- On the details page, I removed the eventlistener from the div and added it to the button. 
Tracks can now be started and stopped with a keyboard. 
I also added semantic tags on the page.

#### JavaScript

##### Context
The webapp is build on JavaScript since it's a SPA.

##### Tests
I disabled JavaScript and not a single page of the webapp worked anymore.
Not so weird since the webapp uses JavaScript libraries for routing and rendering.

##### Solution(s)
A solution would be to use server side rendering as fallback.
That way the pages could be sent to the user if he/she disables JavaScript.

#### Cookies
Webapp doesn't use cookies.

#### Localstorage
Webapp doesn't use localstorage.

### Device lab
I tested the webapp on different devices. 
Unfortunately, it worked only on the HTC tablet because it was the only device that supported HTTP2.
I didn't had enough time to add support for HTTPS so that's a todo for later.
Though, the app did work well on the HTC tablet. 
The home page and the scan page worked perfectly.
The only issue was on the details page, where the SVG of the stop button didn't display.
I didn't had time to look into the problem, so that's a todo for later.

### Screen reader
I tested the webapp with the Windows screen reader.
While the screen reader did found my buttons and a tag so that the user can navigate around, toggle the flashlight and play the tracks,
the buttons and the a tag didn't had any meaning.
For the a tag on the homepage the screen reader read out the full url to the scan page. 
For a user using a screen reader the url is hard to understand because it's basically all numbers. This is because the webapp is hosted on a server which doesn't use a domain name.
The screen reader reffered the flashlight button on the scan page simply as 'button'. This doesn't has any meaning for a user using a screen reader.
The play/stop buttons on the details page got the same issue.
I didn't had enough time to investigate the issues with the screen reader, so I add it as a todo for later.

