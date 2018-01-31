import { external } from '../externalModules.js';
import { addToolState, getToolState } from '../stateManagement/toolState';

// UNUSED const toolType = 'thresholding';

let LASTELEMENT = null;

export function getLastElement () {
  return LASTELEMENT;
}

const LABEL_SIZE_BYTES = 1;

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
function performThresholding (stack, afterwards) {
  let width, height;
  const imageIds = stack.imageIds;
  const slices = imageIds.length;

  // Get slope and intercept
  return external.cornerstone.loadImage(imageIds[0]).then(function (image) {
    width = image.width;
    height = image.height;

    const length = width * height * slices * LABEL_SIZE_BYTES;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);

    // Thresholding promises
    const promises = imageIds.map(function (imageId, imageIdx) {

      return external.cornerstone.loadImage(imageId).then(function (image) {
        const slope = image.slope;
        const intercept = image.intercept;
        const pixelData = image.getPixelData();
        const n = width * height;
        console.log("pixelData: ", pixelData.length);
        console.log("n: ", n); 

        for (let i = 0; i < n; i++) {
          const pixel = pixelData[i];
          const hu = (pixel * slope) + intercept;
          const label = (hu >= configuration.calciumThresholdHu) ? 1 : 0;
          const viewIdx = (imageIdx) * n + i;

          view[viewIdx] = label;
        }
      });
    });

    // Callback with buffer
    return Promise.all(promises).then(function () {
      const result = {
        buffer,
        width,
        height
      };

      if (afterwards) {
        afterwards(result);
      }

      return result;
    });

  });
}

let imgdata = null;

/**
 * Draw regions on image
 */
function onImageRendered (e) {
  const eventData = e.detail;
  const element = eventData.element;
  const stackData = getToolState(element, 'stack');
  const thresholdingData = getToolState(element, 'regions');

  if (!thresholdingData || !thresholdingData.data || !thresholdingData.data.length) {
    return;
  }

  const slice = stackData.data[0].currentImageIdIndex;
  const buffer = thresholdingData.data[0].buffer;
  const context = eventData.canvasContext;
  const enabledElement = eventData.enabledElement;
  const image = eventData.image;
  const width = image.width;
  const height = image.height;

  const doubleBuffer = document.createElement('canvas');
  const doubleBufferContext = doubleBuffer.getContext('2d');

  doubleBuffer.width = width;
  doubleBuffer.height = height;
  imgdata = imgdata || doubleBufferContext.createImageData(width, height);

  const pixels = imgdata.data;
  const sliceSize = width * height;
  const sliceOffset = slice * sliceSize;
  const view = new Uint8Array(buffer, sliceOffset, sliceSize);

  for (let i = 0; i < view.length; i += 1) {
    const label = view[i];
    const pi = i * 4;

    if (label) {
      const color = configuration.regionColorsRGB[label - 1];

      pixels[pi + 0] = color[0];
      pixels[pi + 1] = color[1];
      pixels[pi + 2] = color[2];
      pixels[pi + 3] = configuration.drawAlpha * 255;
    } else {
      pixels[pi + 3] = 0;
    }
  }
  doubleBufferContext.putImageData(imgdata, 0, 0);

  external.cornerstone.setToPixelCoordinateSystem(enabledElement, context);
  context.drawImage(doubleBuffer, 0, 0);
}

function enable (element, doneCallback) {
  // Check if tool is already enabled. If so, don't reenable
  const thresholdingData = getToolState(element, 'regions');

  if (thresholdingData.data[0] && thresholdingData.data[0].enabled) {
    return;
  }

  LASTELEMENT = element;
  // First check that there is stack data available
  const stackData = getToolState(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  const initialThresholdingData = {
    enabled: 1,
    buffer: null,
    width: null,
    height: null,
    history: []
  };

  addToolState(element, 'regions', initialThresholdingData);

  const stack = stackData.data[0];

  setTimeout(() => {
    performThresholding(stack, function (regions) {
      // Add threshold data to tool state
      const thresholdingData = getToolState(element, 'regions');

      thresholdingData.data[0].buffer = regions.buffer;
      thresholdingData.data[0].width = regions.width;
      thresholdingData.data[0].height = regions.height;
      // Draw regions on image
      element.addEventListener('cornerstoneimagerendered', onImageRendered);

      // Update the element to apply the viewport and tool changes
      external.cornerstone.updateImage(element);

      typeof doneCallback === 'function' && doneCallback();
    });
  }, 100);
}

function disable (element) {
  const thresholdingData = getToolState(element, 'regions');

  // If there is actually something to disable, disable it
  if (thresholdingData && thresholdingData.data.length) {
    thresholdingData.data[0].enabled = false;
  }
}

export function update (element) {
  const enabledElement = element || LASTELEMENT;

  return new Promise((resolve, reject) => {
    disable(enabledElement);
    enable(enabledElement, () => {
      resolve();
    });
  });
}

export function createUndoStep (element) {
  const thresholdingData = getToolState(element, 'regions');

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
