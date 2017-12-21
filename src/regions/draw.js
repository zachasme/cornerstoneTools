import { external } from '../externalModules.js';
import { addToolState, clearToolState, getToolState } from '../stateManagement/toolState';
import isMouseButtonEnabled from '../util/isMouseButtonEnabled.js';
import * as regionsThreshold from './thresholding.js';

const toolType = 'drawing';

let configuration = {
  snap: false // Snap to thresholded region or not
};

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
  const { canvasContext, enabledElement, element } = eventData;

  // Set the canvas context to the image coordinate system
  external.cornerstone.setToPixelCoordinateSystem(enabledElement, canvasContext);

  // Points
  const drawingData = getToolState(element, toolType);
  const context = eventData.canvasContext;
  const points = drawingData.data[0].points;

  if (points.length < 2) {
    return;
  }

  const first = points[0];
  const xFirst = first[0];
  const yFirst = first[1];

  context.fillStyle = 'rgba(255,255,255,.2)';
  context.strokeStyle = 'white';
  context.beginPath();
  context.moveTo(xFirst, yFirst);
  points.slice(1).forEach(function (point) {
    context.lineTo(point[0], point[1]);
  });
  context.closePath();
  context.stroke();
  context.fill();
}

function updateRegions (element) {
  const { toolRegionValue, layersAbove, layersBelow } = regionsThreshold.getConfiguration();

  regionsThreshold.createUndoStep(element);

  // Get tool data
  const stackData = getToolState(element, 'stack');
  const thresholdingData = getToolState(element, 'regions');
  const drawingData = getToolState(element, toolType);

  // Extract tool data
  const slice = stackData.data[0].currentImageIdIndex;
  const numSlices = stackData.data[0].imageIds.length;
  const regions = thresholdingData.data[0];
  const points = drawingData.data[0].points;

  // Extract region data
  const buffer = regions.buffer;
  const width = regions.width;
  const height = regions.height;

  // Find operation bounds
  const startSlice = Math.max(0, slice - layersAbove);
  const endSlice = Math.min(numSlices, slice + layersBelow);

  // Setup view into buffer
  const sliceSize = width * height;
  const sliceOffset = startSlice * sliceSize;
  const view = new Uint8Array(buffer, sliceOffset);

  // Mark points inside
  for (let dslice = 0; dslice <= endSlice - startSlice; dslice += 1) {
    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        const index = x + (y * width) + (dslice * sliceSize);
        const prevValue = view[index];

        let snapBool;

        if (configuration.snap) {
          snapBool = prevValue > 0;
        } else {
          snapBool = true;
        }
        if (snapBool && isInside([x, y], points)) {
          view[index] = toolRegionValue;
        }
      }
    }
  }
}

// Disable drawing and tracking on mouse up also update regions
function mouseUpCallback (e, eventData) {
  external.$(eventData.element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
  external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  external.$(eventData.element).off('CornerstoneImageRendered', onImageRendered);
  updateRegions(eventData.element);
  external.cornerstone.updateImage(eventData.element);
}

function mouseDownCallback (e, eventData) {
  console.log('*** e.data ***', e.data);
  console.log('*** eventData ***', eventData);
  if (isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)) {
    const toolData = getToolState(e.currentTarget, toolType);

    toolData.data[0].points = [];

    external.$(eventData.element).on('CornerstoneToolsMouseDrag', mouseDragCallback);
    external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    external.$(eventData.element).on('CornerstoneImageRendered', onImageRendered);

    return mouseDragCallback(e, eventData);
  }
}

function mouseDragCallback (e, eventData) {
  e.stopImmediatePropagation(); // Prevent CornerstoneToolsTouchStartActive from killing any press events

  // If we have no toolData for this element, return immediately as there is nothing to do
  const toolData = getToolState(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  const point = eventData.currentPoints.image;

  toolData.data[0].points.push([point.x, point.y]);

  external.cornerstone.updateImage(eventData.element);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

function enable (element, mouseButtonMask) {
  const eventData = {
    mouseButtonMask
  };

    // Clear any currently existing toolData
  clearToolState(element, toolType);

  addToolState(element, toolType, {
    points: []
  });

  external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
  external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseDownCallback);
}

function disable (element) {
  external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
}

export function getConfiguration () {
  return configuration;
}

export function setConfiguration (config) {
  configuration = config;
}

// Module/private exports

export default {
  enable,
  disable,
  activate: enable,
  deactivate: disable,
  getConfiguration,
  setConfiguration
};
