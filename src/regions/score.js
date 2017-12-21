import { external } from '../externalModules.js';
import { getConfiguration, getLastElement } from './thresholding.js';
import { getToolState } from '../stateManagement/toolState';

function getDensityFactor (hu) {
  if (hu < 130) {
    return 0;
  } else if (hu < 200) {
    return 1;
  } else if (hu < 300) {
    return 2;
  } else if (hu < 400) {
    return 3;
  }

  return 4;
}

// Finds the value with the most occurrences in array
// Should be O(n)
function mode (array) {
  if (array.length === 0) {
    return null;
  }
  const modeMap = {};
  let maxEl = array[0];
  let maxCount = 1;

  for (let i = 0; i < array.length; i++) {
    const el = array[i];

    if (modeMap[el] === null) {
      modeMap[el] = 1;
    } else {
      modeMap[el]++;
    }

    if(modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }

  return maxEl;
}

export function score () {
  const element = getLastElement();
  const thresholdingData = getToolState(element, 'regions');
  const stackData = getToolState(element, 'stack');
  const imageIds = stackData.data[0].imageIds;
  const { regionColorsRGB, kvpToMultiplier } = getConfiguration();

  // Extract and group region-voxels
  const voxelsEachRegion = regionColorsRGB.slice(1).map(() => []);
  const maxHUEachRegion = regionColorsRGB.slice(1).map(() => -Infinity);

  const regionBuffer = thresholdingData.data[0].buffer;
  const view = new Uint8Array(regionBuffer);

  let zLength;
  let xLength;
  let yLength;
  let voxelSize;
  let kvpMultiplier;
  let prevSliceLocation;
  let overlapFactor;
  let modeOverlapFactor;
  const overlapFactors = [];

  const promises = imageIds.map((imageId, imageIndex) => external.cornerstone.loadImage(imageId).then((image) => {
    const dataSet = image.data;
    const sliceLocation = dataSet.floatString('x00201041');
    // TODO: use these as attributes instead of the ones from Viewers
    // Test that it is indeed the same values    const sliceThickness = dataSet.floatString('x00180050');
    const sliceThickness = dataSet.floatString('x00180050');
    const pixelSpacing = dataSet.string('x00280030').split('\\').map(parseFloat);
    const kVP = dataSet.floatString('x00180060');
    const rescaleSlope = dataSet.floatString('x00281053');
    const rescaleIntercept = dataSet.floatString('x00281052');

    // Ca score is compute with slice thickness of 3 mm (jvf. mail from Axel)
    zLength = sliceThickness / 3;
    xLength = pixelSpacing[0];
    yLength = pixelSpacing[1];
    voxelSize = zLength * xLength * yLength; // In mm
    kvpMultiplier = kvpToMultiplier[kVP];

    if (prevSliceLocation) {
      const absPrevLocation = Math.abs(prevSliceLocation);
      const absCurrentLocation = Math.abs(sliceLocation);
      const overlap = absPrevLocation > absCurrentLocation
                      ? absPrevLocation - absCurrentLocation
                      : absCurrentLocation - absPrevLocation;
      // console.log(absPrevLocation)
      // console.log("overlap", overlap)
      // console.log("sliceThickness", sliceThickness)
      // overlapFactor = overlap <= 3 ? (3 - overlap) / 3 : 1;
      overlapFactor = overlap < sliceThickness ? (sliceThickness - overlap) / sliceThickness : 1;
      // console.log(overlapFactor)
      overlapFactors.push(overlapFactor);
      modeOverlapFactor = mode(overlapFactors);
      prevSliceLocation = sliceLocation;
    } else {
      prevSliceLocation = sliceLocation;
    }

    const width = image.width;
    const height = image.height;
    const sliceSize = width * height;
    const pixelData = image.getPixelData();
    const offset = imageIndex * sliceSize;

    for (let i = 0; i < pixelData.length; i += 1) {
      const label = view[offset + i];

      if (label > 1) {
        const value = pixelData[i];
        const hu = (value * parseInt(rescaleSlope)) + parseInt(rescaleIntercept);
        const currentMax = maxHUEachRegion[label - 2];

        voxelsEachRegion[label - 2].push(hu);
        if (hu > currentMax) {
          maxHUEachRegion[label - 2] = hu;
        }
      }
    }
  }));

  return Promise.all(promises).then(function () {
    return voxelsEachRegion.map((voxels, i) => {
      console.log("SCORE -> voxelsEachRegion");
      // UNUSED??    const mean_HU = sum / region.length
      const maxHU = maxHUEachRegion[i];

      const densityFactor = getDensityFactor(maxHU);
      const area = voxels.length * voxelSize;

      const cascore = area * densityFactor * kvpMultiplier;
      //
      // console.log("modeOverlapFactor", modeOverlapFactor)
      // console.log("voxels.length: " + voxels.length);
      // console.log("voxelSize: " + voxelSize);
      // console.log("Area: " + area);
      // console.log("Max HU: " + maxHU);
      // console.log("densityFactor: " + densityFactor);
      // console.log("kvpMultiplier: " + kvpMultiplier);
      // console.log("CAscore: " + cascore);

      // If modeOverlapFactor factor is undefined it is because there is only one slice in the series.
      // In this case obviously modeOverlapFactor is meaningless and should not be multiplied with cascore.
      if (modeOverlapFactor) {
        return cascore * modeOverlapFactor;
      } else {
        return cascore;
      }
    });
  });

}

export default score;
