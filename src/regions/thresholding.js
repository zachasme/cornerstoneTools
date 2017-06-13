import { addToolState, getToolState } from '../stateManagement/toolState';

const toolType = 'thresholding';

const CALCIUM_THRESHOLD_HU = 130;
const LABEL_SIZE_BYTES = 8;
const REGION_COLORS_RGBA = [
  [255, 10, 255], // Unused?
  [255, 100, 100],
  [100, 100, 255],
  [100, 255, 255],
  [255, 100, 255]
];

/**
 * Perform the thresholding on a stack
 */
function performThresholding (stack, callback) {
    let width, height;
    const imageIds = stack.imageIds;
    const slices = imageIds.length;

    // get slope and intercept
    return cornerstone.loadImage(imageIds[0]).then(function(image) {
        width = image.width;
        height = image.height;

        var length = width * height * slices * LABEL_SIZE_BYTES;
        var buffer = new ArrayBuffer(length);
        var view = new Uint8Array(buffer);

        // thresholding promises
        var promises = imageIds.map(function(imageId, imageIdx) {

            return cornerstone.loadImage(imageId).then(function(image){
                var slope = image.slope;
                var intercept = image.intercept;
                var pixelData = image.getPixelData();
                var n = width * height;
                for (let i = 0; i < n; i++) {
                    var pixel = pixelData[i];
                    var hu = (pixel * slope) + intercept;
                    var label = (hu >= CALCIUM_THRESHOLD_HU) ? 1 : 0;
                    var viewIdx = (imageIdx) * n + i;
                    view[viewIdx] = label;
                }
            })
        })

        // callback with buffer
        return Promise.all(promises).then(function(){
          var result = {buffer, width, height};
            if (callback) callback(result);
            return result;
        })

    })
}

/**
 * Draw regions on image
 */
function onImageRendered(e, eventData) {
    const element = eventData.element;
    var stackData = cornerstoneTools.getToolState(element, 'stack');
    var thresholdingData = cornerstoneTools.getToolState(element, 'regions');
    if (!thresholdingData || !thresholdingData.data || !thresholdingData.data.length) {
        return;
    }

    var slice = stackData.data[0].currentImageIdIndex;
    var buffer = thresholdingData.data[0].buffer;
    var context = eventData.canvasContext;
    var enabledElement = eventData.enabledElement;
    var image = eventData.image;
    var width = image.width;
    var height = image.height;

    const doubleBuffer = document.createElement('canvas');
    doubleBuffer.width = width;
    doubleBuffer.height = height;
    var doubleBufferContext = doubleBuffer.getContext('2d');
    const imgdata = doubleBufferContext.createImageData(width, height);
    const pixels = imgdata.data

    const sliceSize = width * height;
    const sliceOffset = slice * sliceSize;
    const view = new Uint8Array(buffer, sliceOffset, sliceSize);
    for (let i = 0; i < view.length; i += 1) {
        const label = view[i];
        if (label) {
            const pi = i * 4;
            const color = REGION_COLORS_RGBA[label - 1];
            pixels[pi + 0] = color[0];
            pixels[pi + 1] = color[1];
            pixels[pi + 2] = color[2];
            pixels[pi + 3] = 0.5 * 255;
        }
    }
    doubleBufferContext.putImageData(imgdata, 0, 0);

    cornerstone.setToPixelCoordinateSystem(enabledElement, context);
    context.drawImage(doubleBuffer, 0, 0);
}

function enable(element) {
    // First check that there is stack data available
    var stackData = getToolState(element, 'stack');
    if (!stackData || !stackData.data || !stackData.data.length) {
        return;
    }

    var initialThresholdingData = {
      enabled: 1,
      buffer: null,
      width: null,
      height: null,
    }
    addToolState(element, 'regions', initialThresholdingData);

    var stack = stackData.data[0];
    performThresholding(stack, function(regions) {
        // add threshold data to tool state
        var thresholdingData = getToolState(element, 'regions');
        thresholdingData.data[0].buffer = regions.buffer;
        thresholdingData.data[0].width = regions.width;
        thresholdingData.data[0].height = regions.height;
        // draw regions on image
        $(element).on('CornerstoneImageRendered', onImageRendered);
    });
}

function disable(element) {
    var thresholdingData = getToolState(element, 'regions');
    // If there is actually something to disable, disable it
    if (thresholdingData && thresholdingData.data.length) {
        thresholdingData.data[0].enabled = false;
    }
}

// module/private exports
export default {
  activate: enable,
  deactivate: disable,
  enable,
  disable,
};
