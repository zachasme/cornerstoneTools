import external from '../externalModules.js';
import { getToolState } from '../stateManagement/toolState.js';
import simpleMouseButtonTool from '../imageTools/simpleMouseButtonTool.js';
import isMouseButtonEnabled from '../util/isMouseButtonEnabled.js';
import { getConfiguration, createUndoStep } from './threshold.js';
import { getToolOptions } from '../toolOptions.js';

const toolType = 'regionsGrow';

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

function regionGrowing (regions, point) {
  const { growIterationsPerChunk, toolRegionValue, layersAbove, layersBelow } = getConfiguration();
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

  // Growing starts at clicked voxel
  let activeVoxels = [linearIndex];

  return new Promise((resolve) => {
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
      setTimeout(chunk, 0);
    }

    chunk();
  });
}

function mouseDownCallback (e) {
  const { currentPoints, element, which } = e.detail;
  const options = getToolOptions(toolType, element);

  if (isMouseButtonEnabled(which, options.mouseButtonMask)) {
    const [stackData] = getToolState(element, 'stack').data;
    const [regionsData] = getToolState(element, 'regions').data;
    const { currentImageIdIndex } = stackData;
    const { x, y } = currentPoints.image;
    const point = [Math.round(x), Math.round(y), currentImageIdIndex];

    createUndoStep(element);
    regionGrowing(regionsData, point).then(() => {
      external.cornerstone.updateImage(element);
    });
  }
}

const grow = simpleMouseButtonTool(mouseDownCallback, toolType);

export default grow;
