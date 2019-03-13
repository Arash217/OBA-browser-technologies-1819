# OBA Album Preview accessibility 

## Summary
Report on the accessibility of the OBA app that I made.

### Images

#### Context
The app uses besides images that are loaded by an API in the details page, only a png image for the 'click to scan' button on the homepage. SVG is used for everything else.

#### Problem(s)
By disabling images in my browser, the image of the 'click to scan' button dissapeared along with the images on the details page.

#### Solution(s)
The image of the 'click to scan' button converted to a SVG since it should have been a SVG like the rest anyway. The images on the details page had already an alt tag so didn't change anything there.
