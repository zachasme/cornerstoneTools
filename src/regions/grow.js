import * as cornerstone from 'cornerstone-core';
import { getToolState } from '../stateManagement/toolState';
import isMouseButtonEnabled from '../util/isMouseButtonEnabled.js';

const toolType = 'regionsGrow';

const REGION_VALUE = 2;

// Get neighbour linear indices
function linearNeighbours (width, height, index) {
  const sliceSize = width * height;

  return [
    index - 1,
    index + 1,
    index - width,
    index + width,
    index - sliceSize,
    index + sliceSize
  ];
}

function regionGrowing (regions, slices, point, nextValue) {
  const { width, height, buffer } = regions;
  const [x, y, slice] = point;

  const view = new Uint8Array(buffer);

  // Calculate linear indices and offsets
  const sliceSize = width * height;
  const sliceOffset = sliceSize * slice;
  const clickIndex = (y * width) + x;
  const linearIndex = sliceOffset + clickIndex;
  const fromValue = view[linearIndex];

  // Only continue if we clicked in thresholded area in different color
  if (fromValue === 0 || fromValue === nextValue) {
    return;
  }

  // Growing starts at clicked voxel
  let activeVoxels = [linearIndex];

  function chunk () {
    // Set the active voxels to nextValue
    activeVoxels.forEach((i) => {
      view[i] = nextValue;
    });

    // The new active voxels are neighbours of curent active voxels
    const nextVoxels = activeVoxels.map(
      (i) => linearNeighbours(width, height, i)
    ).reduce( // Flatten the array of arrays to array of indices
      (acc, cur) => acc.concat(cur), []
    ).filter( // Remove duplicates
      (value, index, self) => self.indexOf(value) === index
    ).filter( // Remove voxels that does not have the correct fromValue
      (i) => view[i] === fromValue
    );

    return nextVoxels;
  }

  // While activeVoxels is not empty
  while (activeVoxels.length !== 0) {
    chunk();
  }
}

function onMouseDown (e, eventData) {
  const { element } = eventData;

  if (isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)) {
    const [stackData] = getToolState(element, 'stack').data;
    const [regionsData] = getToolState(element, 'regions').data;
    const { currentImageIdIndex, imageIds } = stackData;
    const { x, y } = eventData.currentPoints.image;

    const point = [Math.round(x), Math.round(y), currentImageIdIndex];

    regionGrowing(regionsData, imageIds.length, point, REGION_VALUE);

    // Redraw image
    cornerstone.updateImage(element);
  }
}

function enable (element, mouseButtonMask) {
  const stackData = getToolState(element, 'stack');
  const regionsData = getToolState(element, 'regions');

  // First check that there is stack/regions data available
  if (!stackData || !stackData.data || !stackData.data.length ||
      !regionsData || !regionsData.data || !regionsData.data.length) {
    return;
  }

  $(element).on('CornerstoneToolsMouseDown', { mouseButtonMask }, onMouseDown);
}

function disable (element) {
  $(element).off('CornerstoneToolsMouseDown', onMouseDown);
}

export default {
  enable,
  disable,
  activate: enable,
  deactivate: disable
};
