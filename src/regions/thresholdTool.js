import { external } from '../externalModules.js';
import { getToolState } from '../stateManagement/toolState.js';
import { TYPED_ARRAY, TOOL_TYPE } from './constants.js';

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

function activate (element, doneCallback) {
  const stackToolData = getToolState(element, 'stack');

  if (!stackToolData || !stackToolData.data || !stackToolData.data.length) {
    return;
  }

  const stackData = stackToolData.data[0];

  setTimeout(() => {
    performThresholding(stackData.imageIds).then((regions) => {
      // Add threshold data to tool state
      const regionsToolData = getToolState(element, TOOL_TYPE);
      const regionsData = regionsToolData.data[0];

      regionsData.buffer = regions.buffer;
      regionsData.width = regions.width;
      regionsData.height = regions.height;

      // Update the element to apply the viewport and tool changes
      external.cornerstone.updateImage(element);

      if (typeof doneCallback === 'function') {
        doneCallback();
      }
    });
  }, 100);
}

export function getConfiguration () {
  return configuration;
}

export function setConfiguration (config) {
  configuration = config;
}

// Module/private exports
export default {
  activate,
  getConfiguration,
  setConfiguration
};
