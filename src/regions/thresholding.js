import external from '../externalModules.js';
import { addToolState, getToolState } from '../stateManagement/toolState';
import { TYPED_ARRAY, TOOL_TYPE } from './constants';

/* HAXX BEGIN */

let HACKY_LASTELEMENT = null;

export function getLastElement () {
  return HACKY_LASTELEMENT;
}

/* HAXX END */

let configuration = {
  historySize: 4,
  historyPosition: 0,
  toolRegionValue: 2,
  calciumThresholdHu: '-', // Placeholder until it gets set ('-' shows up nicely in text input)
  layersAbove: 0,
  layersBelow: 0,
  drawAlpha: 1,
  regionColorsRGB: [
    [255, 0, 255],
    [246, 193, 91],
    [237, 148, 69],
    [230, 103, 49],
    [184, 74, 41],
    [106, 58, 45]
  ],
  KVPToMultiplier: {
    150: 1.06,
    140: 1.04,
    130: 1.02,
    120: 1,
    110: 0.98,
    100: 0.96,
    90: 0.93,
    80: 0.89,
    70: 0.85
  },
  growIterationsPerChunk: 2
};

configuration.calciumThresholdHuParsed = parseInt(configuration.calciumThresholdHu);

/**
 * Perform the thresholding on a stack
 */
function performThresholding (imageIds) {
  let width, height, view, buffer;

  // Thresholding promises
  return Promise.all(imageIds.map((imageId, imageIdIndex) =>
    external.cornerstone.loadImage(imageId).then((image) => {
      if (!buffer) {
        // Initialize variables on first loaded image
        width = image.width;
        height = image.height;

        const length = width * height * imageIds.length;

        buffer = new ArrayBuffer(length);
        view = new TYPED_ARRAY(buffer);
      }

      const { intercept, slope } = image;
      const pixelData = image.getPixelData();
      const sliceSize = width * height;

      for (let i = 0; i < sliceSize; i++) {
        const value = pixelData[i];
        // Calculate hu-value
        const hu = (value * slope) + intercept;
        // Check against threshold
        const label = (hu >= configuration.calciumThresholdHu) ? 1 : 0;
        // Calculate offset within view into ArrayBufer
        const offset = imageIdIndex * sliceSize + i;

        // Finally, assign label
        view[offset] = label;
      }
    })
  // When all promises resolve, return the buffer and its dimensions
  )).then(() => ({
    buffer,
    width,
    height
  }));
}

/**
 * Draw regions on image
 */
function onImageRendered ({ detail }) {
  const { canvasContext, element, enabledElement, image } = detail;
  const { width, height } = image;

  const stackToolData = getToolState(element, 'stack');
  const regionsToolData = getToolState(element, TOOL_TYPE);

  // Ensure tool is enabled
  if (!regionsToolData || !regionsToolData.data || !regionsToolData.data.length) {
    return;
  }

  // Extract tool data
  const { currentImageIdIndex } = stackToolData.data[0];
  const { drawBuffer, buffer } = regionsToolData.data[0];

  const doubleBuffer = drawBuffer.canvas;
  const imageData = drawBuffer.imageData;

  const pixels = imageData.data;
  const sliceSize = width * height;
  const sliceOffset = currentImageIdIndex * sliceSize;
  const view = new TYPED_ARRAY(buffer, sliceOffset, sliceSize);

  for (let offset = 0; offset < view.length; offset += 1) {
    // Each pixel is represented by four elements in the imageData array
    const imageDataOffset = offset * 4;
    const label = view[offset];

    if (label) {
      const color = configuration.regionColorsRGB[label - 1];

      pixels[imageDataOffset + 0] = color[0];
      pixels[imageDataOffset + 1] = color[1];
      pixels[imageDataOffset + 2] = color[2];
      pixels[imageDataOffset + 3] = configuration.drawAlpha * 255;
    } else {
      pixels[imageDataOffset + 3] = 0;
    }
  }

  // Put image data back into offscreen canvas
  doubleBuffer.getContext('2d').putImageData(imageData, 0, 0);
  // Set transforms based on zoom/pan/etc
  external.cornerstone.setToPixelCoordinateSystem(enabledElement, canvasContext);
  // Finally, draw offscreen canvas onto context
  canvasContext.drawImage(doubleBuffer, 0, 0);
}

function enable (element, doneCallback) {
  // Check if tool is already enabled. If so, don't reenable
  const thresholdingData = getToolState(element, TOOL_TYPE);

  if (thresholdingData.data[0] && thresholdingData.data[0].enabled) {
    return;
  }

  HACKY_LASTELEMENT = element;

  // First check that there is stack data available
  const stackToolData = getToolState(element, 'stack');

  if (!stackToolData || !stackToolData.data || !stackToolData.data.length) {
    return;
  }

  const initialThresholdingData = {
    enabled: 1,
    buffer: null,
    width: null,
    height: null,
    history: [],
    drawBuffer: null
  };

  addToolState(element, TOOL_TYPE, initialThresholdingData);

  const stackData = stackToolData.data[0];

  setTimeout(() => {
    performThresholding(stackData.imageIds).then((regions) => {
      // Add threshold data to tool state
      const regionsToolData = getToolState(element, TOOL_TYPE);
      const regionsData = regionsToolData.data[0];

      // Initialize rendering double buffer canvas
      const { width, height } = regions;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const imageData = context.createImageData(width, height);

      canvas.width = width;
      canvas.height = height;

      regionsData.drawBuffer = {
        canvas,
        imageData
      };
      regionsData.buffer = regions.buffer;
      regionsData.width = regions.width;
      regionsData.height = regions.height;
      // Draw regions on image
      element.addEventListener('cornerstoneimagerendered', onImageRendered);

      // Update the element to apply the viewport and tool changes
      external.cornerstone.updateImage(element);

      if (typeof doneCallback === 'function') {
        doneCallback();
      }
    });
  }, 100);
}

function disable (element) {
  const thresholdingData = getToolState(element, TOOL_TYPE);

  // If there is actually something to disable, disable it
  if (thresholdingData && thresholdingData.data.length) {
    thresholdingData.data[0].enabled = false;
  }
}

export function update (element) {
  const enabledElement = element || HACKY_LASTELEMENT;

  return new Promise((resolve, reject) => {
    disable(enabledElement);
    enable(enabledElement, () => {
      resolve();
    });
  });
}

export function createUndoStep (element) {
  const thresholdingData = getToolState(element, TOOL_TYPE);

  const state = thresholdingData.data[0];
  // Make a copy using .slice()
  const current = state.buffer.slice();

  // Put at end of history
  state.history.push(current);
  // Remove oldest if too much history
  if (state.history.length > configuration.historySize) {
    state.history.shift();
  }
}

export function getConfiguration () {
  return configuration;
}

export function setConfiguration (config) {
  configuration = config;
}

// Module/private exports
export default {
  activate: enable,
  deactivate: disable,
  update,
  enable,
  disable,
  getConfiguration,
  setConfiguration
};
