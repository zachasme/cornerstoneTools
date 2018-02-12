# Cornerstone Tools (Cacalc fork)

Main branch: `thresholding`

## Usage
```
var stack = {
    currentImageIdIndex : 0,
    imageIds: imageIds
};

cornerstone.loadImage(imageIds[0]).then(function(image) {
    // Display the image
    cornerstone.displayImage(element, image);

    // Enable scrolling through stack
    cornerstoneTools.stackScrollWheel.activate(element);

    // Set the stack as tool state
    cornerstoneTools.addToolState(element, 'stack', stack);
    // Initialize regions toolstate
    cornerstoneTools.addToolState(element, 'regions', cornerstoneTools.regionsToolState());

    // Enable all tools we want to use with this element
    cornerstoneTools.lesionIndicator.enable(element);
    cornerstoneTools.regionsDraw.activate(element, 4);
    cornerstoneTools.regionsGrow.activate(element, 1);

    // Thresholding and scoring are special,
    // they perform action on activate
    cornerstoneTools.regionsThreshold.activate(element);
    cornerstoneTools.regionsScore(element);
});
}
```

## Development
An example using region stuff is available in `/examples/regions/index.html` To run this, you must start a simple server in the root directory using e.g.

`python -m SimpleHTTPServer 8080`

The example is now available at `localhost:8080/examples/regions`
Furthermore, you must also run `npm run watch`.

The source is located in `/src/regions`.

The production code should be pushed to the `thresholding` branch.
