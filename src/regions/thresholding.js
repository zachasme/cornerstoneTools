import * as cornerstone from 'cornerstone-core';
import { addToolState, getToolState } from '../stateManagement/toolState';

// UNUSED const toolType = 'thresholding';

const LABEL_SIZE_BYTES = 1;

let configuration = {
  toolRegionValue: 3,
  calciumThresholdHu: 130,
  layersAbove: 0,
  layersBelow: 1,
  regionColorsRGBA: [
    [255, 10, 255], // Unused?
    [255, 100, 100],
    [100, 100, 255],
    [100, 255, 255],
    [255, 100, 255]
  ],
  growIterationsPerChunk: 2
};

/**
 * Perform the thresholding on a stack
 */
function performThresholding (stack, afterwards) {
  let width, height;
  const imageIds = stack.imageIds;
  const slices = imageIds.length;

  // Get slope and intercept
  return cornerstone.loadImage(imageIds[0]).then(function (image) {
    width = image.width;
    height = image.height;

    const length = width * height * slices * LABEL_SIZE_BYTES;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);

    // Thresholding promises
    const promises = imageIds.map(function (imageId, imageIdx) {

      return cornerstone.loadImage(imageId).then(function (image) {
        const slope = image.slope;
        const intercept = image.intercept;
        const pixelData = image.getPixelData();
        const n = width * height;

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
function onImageRendered (e, eventData) {
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
      const color = configuration.regionColorsRGBA[label - 1];

      pixels[pi + 0] = color[0];
      pixels[pi + 1] = color[1];
      pixels[pi + 2] = color[2];
      pixels[pi + 3] = 0.5 * 255;
    } else {
      pixels[pi + 3] = 0;
    }
  }
  doubleBufferContext.putImageData(imgdata, 0, 0);

  cornerstone.setToPixelCoordinateSystem(enabledElement, context);
  context.drawImage(doubleBuffer, 0, 0);
}

function enable (element) {
  // First check that there is stack data available
  const stackData = getToolState(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  const initialThresholdingData = {
    enabled: 1,
    buffer: null,
    width: null,
    height: null
  };

  addToolState(element, 'regions', initialThresholdingData);

  const stack = stackData.data[0];

  performThresholding(stack, function (regions) {
    // Add threshold data to tool state
    const thresholdingData = getToolState(element, 'regions');

    thresholdingData.data[0].buffer = regions.buffer;
    thresholdingData.data[0].width = regions.width;
    thresholdingData.data[0].height = regions.height;
    // Draw regions on image
    $(element).on('CornerstoneImageRendered', onImageRendered);

    // Update the element to apply the viewport and tool changes
    cornerstone.updateImage(element);
  });
}

function disable (element) {
  const thresholdingData = getToolState(element, 'regions');

  // If there is actually something to disable, disable it
  if (thresholdingData && thresholdingData.data.length) {
    thresholdingData.data[0].enabled = false;
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
  enable,
  disable,
  getConfiguration,
  setConfiguration
};
