import EVENTS from '../events.js';
import external from '../externalModules.js';
import { getToolState } from '../stateManagement/toolState.js';
import { getToolOptions, setToolOptions } from '../toolOptions.js';
import simpleMouseButtonTool from '../imageTools/simpleMouseButtonTool.js';
import isMouseButtonEnabled from '../util/isMouseButtonEnabled.js';
import pointInsidePolygon from '../util/pointInsidePolygon.js';
import * as regionsThreshold from './threshold.js';

const toolType = 'draw';

let configuration = {
  snap: false, // Snap to thresholded region or not
  fillStyle: 'rgba(255,255,255,.2)',
  strokeStyle: 'white'
};

function updateRegions (element) {
  const { toolRegionValue, layersAbove, layersBelow } = regionsThreshold.getConfiguration();

  regionsThreshold.createUndoStep(element);

  // Get tool data
  const stackData = getToolState(element, 'stack');
  const thresholdingData = getToolState(element, 'regions');
  const options = getToolOptions(toolType, element);

  // Extract tool data
  const slice = stackData.data[0].currentImageIdIndex;
  const numSlices = stackData.data[0].imageIds.length;
  const regions = thresholdingData.data[0];
  const points = options.points.map(({ x, y }) => ([x, y]));

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
        if (snapBool && pointInsidePolygon([x, y], points)) {
          view[index] = toolRegionValue;
        }
      }
    }
  }
}

// Draw regions on the canvas
function imageRenderedCallback (e) {
  const { canvasContext, enabledElement, element } = e.detail;
  const { fillStyle, strokeStyle } = draw.getConfiguration();

  // Points
  const options = getToolOptions(toolType, element);
  const points = options.points;

  if (points.length < 2) {
    return;
  }

  // Set the canvas context to the image coordinate system
  external.cornerstone.setToPixelCoordinateSystem(enabledElement, canvasContext);

  canvasContext.fillStyle = fillStyle;
  canvasContext.strokeStyle = strokeStyle;
  canvasContext.beginPath();
  canvasContext.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach(function (point) {
    canvasContext.lineTo(point.x, point.y);
  });
  canvasContext.closePath();
  canvasContext.stroke();
  canvasContext.fill();
}

function dragCallback (e) {
  const { currentPoints, element } = e.detail;
  const options = getToolOptions(toolType, element);

  options.points.push(currentPoints.image);
  external.cornerstone.updateImage(element);

  e.preventDefault();
  e.stopPropagation();
}

// Disable drawing and tracking on mouse up also update regions
function mouseUpCallback (e) {
  const { element } = e.detail;

  element.removeEventListener(EVENTS.MOUSE_DRAG, dragCallback);
  element.removeEventListener(EVENTS.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(EVENTS.MOUSE_CLICK, mouseUpCallback);
  element.removeEventListener(EVENTS.IMAGE_RENDERED, imageRenderedCallback);

  updateRegions(element);
  external.cornerstone.updateImage(element);
}

// Start drawing and tracking on mouse up, also reset points array
function mouseDownCallback (e) {
  const { element, which } = e.detail;
  const options = getToolOptions(toolType, element);

  if (isMouseButtonEnabled(which, options.mouseButtonMask)) {
    options.points = [];

    setToolOptions(toolType, element, options);

    element.addEventListener(EVENTS.MOUSE_DRAG, dragCallback);
    element.addEventListener(EVENTS.MOUSE_UP, mouseUpCallback);
    element.addEventListener(EVENTS.MOUSE_CLICK, mouseUpCallback);
    element.addEventListener(EVENTS.IMAGE_RENDERED, imageRenderedCallback);

    e.preventDefault();
    e.stopPropagation();
  }
}

const draw = simpleMouseButtonTool(mouseDownCallback, toolType);

draw.getConfiguration = () => configuration;
draw.setConfiguration = (config) => {
  configuration = config;
};

export default draw;
