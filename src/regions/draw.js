const toolType = 'regionsDraw';

const REGION_VALUE = 4;
const LAYERS_ABOVE = 0;
const LAYERS_BELOW = 5;

// Determine if a point is inside a polygon
function isInside (point, vs) {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const [xi, yi] = vs[i];
    const [xj, yj] = vs[j];

    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

// Draw regions on the canvas
function onImageRendered (e, eventData) {
  const { canvasContext, enabledElement } = eventData;

  // set the canvas context to the image coordinate system
  cornerstone.setToPixelCoordinateSystem(enabledElement, canvasContext);
  // points
  const drawingData = cornerstoneTools.getToolState(enabledElement, toolType);
  const context = eventData.canvasContext;
  const points = drawingData.data[0].points;

  if (points.length < 2) {
    return;
  }

  var first = points[0];
  var xFirst = first[0];
  var yFirst = first[1]

  context.fillStyle = 'rgba(255,255,255,.2)';
  context.strokeStyle = 'white';
  context.beginPath();
  context.moveTo(xFirst, yFirst);
  points.slice(1).forEach(function(point) {
    context.lineTo(point[0], point[1]);
  })
  context.closePath();
  context.stroke();
  context.fill();
}

function updateRegions(value, layersAbove, layersBelow) {
  // get tool data
  var stackData = cornerstoneTools.getToolState(element, 'stack');
  var thresholdingData = cornerstoneTools.getToolState(element, 'regions');
  var drawingData = cornerstoneTools.getToolState(element, toolType);

  // extract tool data
  var slice = stackData.data[0].currentImageIdIndex;
  var numSlices = stackData.data[0].imageIds.length;
  var regions = thresholdingData.data[0];
  var points = drawingData.data[0].points;

  // extract region data
  var buffer = regions.buffer;
  var width = regions.width;
  var height = regions.height;

  // find operation bounds
  var startSlice = Math.max(0, slice - layersAbove)
  var endSlice = Math.min(numSlices, slice + layersBelow)

  // setup view into buffer
  const sliceSize = width * height;
  const sliceOffset = startSlice * sliceSize;
  const view = new Uint8Array(buffer, sliceOffset);

  // mark points inside
  for (let dslice = 0; dslice <= endSlice - slice; dslice += 1) {
    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        const index = x + (y * width) + (dslice * sliceSize);
        const prevValue = view[index];
        if (prevValue > 0 && isInside([x, y], points)) {
          view[index] = value;
        }
      }
    }
  }
}

// disable drawing and tracking on mouse up also update regions
function mouseUpCallback (e, eventData) {
  $(eventData.element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
  $(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  $(eventData.element).off('CornerstoneImageRendered', onImageRendered);
  updateRegions(REGION_VALUE, LAYERS_ABOVE, LAYERS_BELOW);
  cornerstone.updateImage(eventData.element);
}

function mouseDownCallback (e, eventData) {
  if (cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)) {
    const toolData = cornerstoneTools.getToolState(e.currentTarget, toolType);
    toolData.data[0].points = [];

    $(eventData.element).on('CornerstoneToolsMouseDrag', mouseDragCallback);
    $(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    $(eventData.element).on('CornerstoneImageRendered', onImageRendered);

    return mouseDragCallback(e, eventData);
  }
}

function mouseDragCallback (e, eventData) {
  e.stopImmediatePropagation(); // Prevent CornerstoneToolsTouchStartActive from killing any press events

    // If we have no toolData for this element, return immediately as there is nothing to do
  const toolData = cornerstoneTools.getToolState(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var point = eventData.currentPoints.image;
  toolData.data[0].points.push([point.x, point.y]);

  cornerstone.updateImage(eventData.element);
  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

function enable (element, mouseButtonMask) {
  var eventData = {
    mouseButtonMask: mouseButtonMask,
  };

    // Clear any currently existing toolData
  cornerstoneTools.clearToolState(element, toolType);

  cornerstoneTools.addToolState(element, toolType, {
    points: [],
  });

  $(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
  $(element).on('CornerstoneToolsMouseDown', eventData, mouseDownCallback);
}

// Disables the reference line tool for the given element
function disable (element) {
  $(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
}

// Module/private exports
cornerstoneTools.regionsDraw = {
  activate: enable,
  deactivate: disable,
  enable,
  disable
};
