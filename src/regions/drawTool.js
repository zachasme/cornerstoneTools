import { external } from '../externalModules.js';
import { addToolState, clearToolState, getToolState } from '../stateManagement/toolState.js';
import mouseButtonTool from '../imageTools/mouseButtonTool.js';
import isMouseButtonEnabled from '../util/isMouseButtonEnabled.js';
import { createUndoStep } from './history.js';

const TOOL_STATE_TOOL_TYPE = 'draw';

const CONFIGURATION = {
  snap: false, // Snap to thresholded region or not
  layersAbove: 1,
  layersBelow: 1,
  toolRegionValue: 2
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
  const { canvasContext, enabledElement } = eventData;

  // Set the canvas context to the image coordinate system
  external.cornerstone.setToPixelCoordinateSystem(enabledElement, canvasContext);

  // Points
  const toolData = getToolState(e.currentTarget, TOOL_STATE_TOOL_TYPE);

  if (!toolData) {
    return;
  }

  const points = toolData.data[0];

  const context = eventData.canvasContext;

  if (!points || points.length < 2) {
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
  const { toolRegionValue, layersAbove, layersBelow, snap } = drawTool.getConfiguration();

  createUndoStep(element);

  // Get tool data
  const stackData = getToolState(element, 'stack');
  const thresholdingData = getToolState(element, 'regions');
  const drawingData = getToolState(element, TOOL_STATE_TOOL_TYPE);
  const points = drawingData.data[0];

  // Extract tool data
  const slice = stackData.data[0].currentImageIdIndex;
  const numSlices = stackData.data[0].imageIds.length;
  const regions = thresholdingData.data[0];

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

        if (snap) {
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

// On mousedown we register event handlers for dragging
function mouseDownActivateCallback (e, eventData) {
  if (isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)) {
    // Reset tool state
    clearToolState(e.currentTarget, TOOL_STATE_TOOL_TYPE);
    addToolState(e.currentTarget, TOOL_STATE_TOOL_TYPE, []);

    external.$(eventData.element).on('CornerstoneToolsMouseDrag', mouseDragCallback);
    external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseDragStopCallback);
    external.$(eventData.element).on('CornerstoneToolsMouseClick', mouseDragStopCallback);
  }
}

function mouseDragCallback (e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  const toolData = getToolState(e.currentTarget, TOOL_STATE_TOOL_TYPE);

  const points = toolData.data[0];

  const point = eventData.currentPoints.image;

  points.push([point.x, point.y]);

  external.cornerstone.updateImage(eventData.element);
}

// Disable drawing and tracking on mouse up also update regions
function mouseDragStopCallback (e, eventData) {
  // Disable drag event listeners
  external.$(eventData.element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
  external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseDragStopCallback);
  external.$(eventData.element).off('CornerstoneToolsMouseClick', mouseDragStopCallback);

  // Update regions and clear tool state
  updateRegions(eventData.element);
  clearToolState(e.currentTarget, TOOL_STATE_TOOL_TYPE);

  external.cornerstone.updateImage(eventData.element);
}

// Module/private exports

const drawTool = mouseButtonTool({
  mouseDownActivateCallback,
  onImageRendered,
  mouseMoveCallback: () => {},
  deactivate: () => {}
});

drawTool.setConfiguration(CONFIGURATION);

export default drawTool;
