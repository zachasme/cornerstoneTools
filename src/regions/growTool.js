import { external } from '../externalModules.js';
import { getToolState } from '../stateManagement/toolState.js';
import simpleMouseButtonTool from '../imageTools/simpleMouseButtonTool.js';
import isMouseButtonEnabled from '../util/isMouseButtonEnabled.js';

import { createUndoStep } from './history.js';

/**
 * A simpleMouseButtonTool that grows from point in stack
 */

const CONFIGURATION = {
  layersAbove: 1,
  layersBelow: 1,
  growIterationsPerChunk: 2,
  toolRegionValue: 2
};

// Get neighbour linear indices within slice bounds
function linearNeighbours (width, height, highSlice, lowSlice, index) {
  const sliceSize = width * height;
  const neighbours = [
    index - 1,
    index + 1,
    index - width,
    index + width
  ];

  // Stay within bounds
  const sliceIndex = Math.floor(index / sliceSize);

  if (sliceIndex < highSlice) {
    neighbours.push(index + sliceSize);
  }
  if (sliceIndex > lowSlice) {
    neighbours.push(index - sliceSize);
  }

  return neighbours;
}

function regionGrowing (element, regions, slices, point) {
  return new Promise(function (resolve) {
    const { growIterationsPerChunk, toolRegionValue, layersAbove, layersBelow } = growTool.getConfiguration();
    const { width, height, buffer } = regions;
    const [x, y, slice] = point;
    const highSlice = slice + layersBelow;
    const lowSlice = slice - layersAbove;

    const view = new Uint8Array(buffer);

    // Calculate linear indices and offsets
    const sliceSize = width * height;
    const sliceOffset = sliceSize * slice;
    const clickIndex = (y * width) + x;
    const linearIndex = sliceOffset + clickIndex;
    const fromValue = view[linearIndex];

    // Only continue if we clicked in thresholded area in different color
    if (fromValue === 0 || fromValue === toolRegionValue) {
      return;
    }
    createUndoStep(element);

    // Growing starts at clicked voxel
    let activeVoxels = [linearIndex];

    function chunk () {
      for(let i = 0; i < growIterationsPerChunk; i++) {
        // While activeVoxels is not empty
        if (activeVoxels.length === 0) {
          return resolve();
        }

        // Set the active voxels to nextValue
        activeVoxels.forEach((i) => {
          view[i] = toolRegionValue;
        });

        // The new active voxels are neighbours of curent active voxels
        const nextVoxels = activeVoxels.map(
          (i) => linearNeighbours(width, height, highSlice, lowSlice, i)
        ).reduce( // Flatten the array of arrays to array of indices
          (acc, cur) => acc.concat(cur), []
        ).filter( // Remove duplicates
          (value, index, self) => self.indexOf(value) === index
        ).filter( // Remove voxels that does not have the correct fromValue
          (i) => view[i] === fromValue
        );

        activeVoxels = nextVoxels;
      }
      external.cornerstone.updateImage(element);
      setTimeout(chunk, 0);
    }

    chunk();
  });
}

function onMouseDown (e, eventData) {
  const { element } = eventData;

  if (isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)) {
    const [stackData] = getToolState(element, 'stack').data;
    const [regionsData] = getToolState(element, 'regions').data;
    const { currentImageIdIndex, imageIds } = stackData;
    const { x, y } = eventData.currentPoints.image;

    const point = [Math.round(x), Math.round(y), currentImageIdIndex];

    regionGrowing(element, regionsData, imageIds.length, point);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }
}

const growTool = simpleMouseButtonTool(onMouseDown);

growTool.setConfiguration(CONFIGURATION);

export default growTool;
