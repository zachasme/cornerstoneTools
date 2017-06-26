import * as cornerstone from 'cornerstone-core';
import { getConfiguration, getLastElement } from './thresholding.js';
import { getToolState } from '../stateManagement/toolState';

function getDensityFactor (hu) {
  if (hu < 200) {
    return 1;
  } else if (hu < 300) {
    return 2;
  } else if (hu < 400) {
    return 3;
  }
  return 4;
}

export function score (attributes) {

  const element = getLastElement();
  const thresholdingData = getToolState(element, 'regions');
  const stackData = getToolState(element, 'stack');
  const regionBuffer = thresholdingData.data[0].buffer;
  const imageIds = stackData.data[0].imageIds;
  const { regionColorsRGB, kvpToMultiplier } = getConfiguration();
  let {
    SliceThickness, PixelSpacing, KVP, RescaleSlope, RescaleIntercept
  } = attributes;
  RescaleSlope = -1024;
  console.log("Attributes: ");
  console.log(attributes);
  // Ca score is compute with slice thickness of 3 mm (jvf. mail from Axel)
  const zLength = SliceThickness / 3;
  const xLength = PixelSpacing[0];
  const yLength = PixelSpacing[1];
  const voxelSize = zLength * xLength * yLength; // In mm
  const kvpMultiplier = kvpToMultiplier[KVP];

  // Extract and group region-voxels
  const voxelsEachRegion = regionColorsRGB.slice(1).map(() => []);
  const maxHUEachRegion = regionColorsRGB.slice(1).map(() => -Infinity);

  const view = new Uint8Array(regionBuffer);
  const promises = imageIds.map((imageId, imageIndex) => cornerstone.loadImage(imageId).then(image => {

    const width = image.width;
    const height = image.height;
    const sliceSize = width * height;
    const pixelData = image.getPixelData();
    const offset = imageIndex * sliceSize;

    for (let i = 0; i < pixelData.length; i += 1) {
      const label = view[offset + i];

      if (label > 1) {
        const value = pixelData[i];
        const hu = (value * RescaleSlope) + RescaleIntercept;
        console.log(hu);
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
      // UNUSED??    const mean_HU = sum / region.length
      const maxHU = maxHUEachRegion[i];

      const densityFactor = getDensityFactor(maxHU);
      const area = voxels.length * voxelSize;

      const cascore = area * densityFactor * kvpMultiplier;

      console.log("voxels.length: " + voxels.length);
      console.log("voxelSize: " + voxelSize);
      console.log("Area: " + area);
      console.log("Max HU: " + maxHU);
      console.log("densityFactor: " + densityFactor);
      console.log("kvpMultiplier: " + kvpMultiplier);
      console.log("CAscore: " + cascore);

      return cascore
    });
  });

}

export default score;
