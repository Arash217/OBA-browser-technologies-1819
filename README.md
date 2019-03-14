# OBA Album Preview accessibility 

## Summary
Report on the accessibility of the OBA webapp that I made.

### Images

#### Context
The webapp used besides images that are loaded by an API in the details page, only a png image for the 'click to scan' button on the homepage. SVG is used for everything else.

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
Tested the website for the different types of colorblind:
- Protanopia
- Deuteranopia
- Tritanopia
- Monochromacy

There weren't any issues, because there is enough contrast between the colors.

#### Solution(s)
No solutions implemented since there weren't any issues.

### Cookies
Didn't use cookies.

### Localstorage
Didn't use localstorage.