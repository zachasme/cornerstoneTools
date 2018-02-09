import { cornerstoneMath, external } from '../externalModules.js';
import { getConfiguration, getLastElement } from './thresholding.js';
import { getToolState } from '../stateManagement/toolState';
import { cloneDeep } from 'lodash'

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

function computeVoxelSize (metaData) {
  if (metaData.sliceThickness === 0 ||
      metaData.pixelSpacing[0] === 0 ||
      metaData.pixelSpacing[1] === 0) {
    throw new Error('sliceThickness or pixelSpacing was 0');
  }
  const zLength = metaData.sliceThickness;
  const xLength = metaData.pixelSpacing[0];
  const yLength = metaData.pixelSpacing[1];


  return zLength * xLength * yLength; // In mm³
}

function computeScore (metaData, voxels) {
  // Division by 3 because Agatson score assumes a slice thickness of 3 mm
  const voxelSizeScaled = computeVoxelSize(metaData) / 3;
  const densityFactor = getDensityFactor(metaData.maxHU);
  const volume = voxels.length * voxelSizeScaled;

  const { KVPToMultiplier } = getConfiguration();
  const KVPMultiplier = KVPToMultiplier[metaData.KVP];
  const cascore = volume * densityFactor * KVPMultiplier;
  //
  console.log(`modeOverlapFactor", ${metaData.modeOverlapFactor}`)
  console.log("voxels.length: " + voxels.length);
  console.log(`voxelSizeScaled: ${voxelSizeScaled}`);
  console.log(`Volume: ${volume}`);
  console.log(`Max HU: ${metaData.maxHU}`);
  console.log(`densityFactor: ${densityFactor}`);
  console.log(`KVPMultiplier: ${KVPMultiplier}`);
  console.log(`CAscore: ${cascore}`);

  // If modeOverlapFactor factor is undefined it is because there is only one slice in the series.
  // In this case obviously modeOverlapFactor is meaningless and should not be multiplied with cascore.
  if (metaData.modeOverlapFactor) {
    return cascore * metaData.modeOverlapFactor;
  }

  return cascore;

}

/*
* Computes the distance between two slices based on the DICOM Image Plane Module
* @param imagePositions {Array[2][3]} - DICOM tag (0020, 0032) of two slices
* @param imageOrientation {Array[2][3]} - DICOM tag (0020, 0037) of first slice
*/
function computeIOPProjectedDistance (imagePositions, imageOrientation) {
  const imagePosition1Vector = new cornerstoneMath.Vector3();

  imagePosition1Vector.fromArray(imagePositions[0]);

  const imagePosition2Vector = new cornerstoneMath.Vector3();

  imagePosition2Vector.fromArray(imagePositions[1]);

  const imageOrientationRowVector = new cornerstoneMath.Vector3();

  imageOrientationRowVector.fromArray(imageOrientation[0]);

  const imageOrientationColumnVector = new cornerstoneMath.Vector3();

  imageOrientationColumnVector.fromArray(imageOrientation[1]);

  // Compute unit normal of Image Orientation crossVectors
  const orientationNormal = new cornerstoneMath.Vector3();

  orientationNormal.crossVectors(imageOrientationRowVector, imageOrientationColumnVector);
  // Project both position vectors on normal
  const projection1 = imagePosition1Vector.projectOnVector(orientationNormal);
  const projection2 = imagePosition2Vector.projectOnVector(orientationNormal);

  // Compute distance of projected vectors
  return projection1.distanceTo(projection2);
}

function computeOverlapFactor (distance, sliceThickness) {
  if (distance <= 0) {
    throw new Error('Distance must be > 0');
  }
  if (distance >= sliceThickness) {
    return 1;
  }

  return (sliceThickness + distance) / (2 * sliceThickness);
}

function bfs (i, j, searchArray, label, lesionVoxels, pixelData, metaData) {
  let stack = [[i, j]]
  while (stack.length > 0) {
    let indexes = stack.shift()
    let i = indexes[0]
    let j = indexes[1]
    if (searchArray[j] && searchArray[j][i] === label) {

      stack.push([i - 1, j])
      stack.push([i + 1, j])
      stack.push([i, j - 1])
      stack.push([i, j + 1])

      let length = searchArray[0].length
      const value = pixelData[i + j * length];
      const hu = (value * parseInt(metaData.rescaleSlope)) + parseInt(metaData.rescaleIntercept);
      if (hu >= 130) {
        lesionVoxels.push(hu);
      }
      searchArray[j][i] = 0;
    }

  }

  // bfs(searchArray, i - 1, j, label, lesionVoxels, pixelData, metaData);
  // bfs(searchArray, i + 1, j, label, lesionVoxels, pixelData, metaData);
  // bfs(searchArray, i, j - 1, label, lesionVoxels, pixelData, metaData);
  // bfs(searchArray, i, j + 1, label, lesionVoxels, pixelData, metaData);
  return lesionVoxels.length > 0;
}

export function score () {
  const element = getLastElement();
  const thresholdingData = getToolState(element, 'regions');
  const stackData = getToolState(element, 'stack');
  const imageIds = stackData.data[0].imageIds;
  const { regionColorsRGB, KVPToMultiplier } = getConfiguration();

  // Extract and group region-voxels
  const voxelsEachRegion = regionColorsRGB.slice(1).map(() => imageIds.map(() => []));
  const maxHUEachRegion = regionColorsRGB.slice(1).map(() => imageIds.map(() => []));

  const regionBuffer = thresholdingData.data[0].buffer;
  const view = new Uint8Array(regionBuffer);

  let prevSliceLocation;
  let overlapFactor;
  let modeOverlapFactor;
  let prevImagePosition;
  const overlapFactors = [];

  var metaData = {};

  const promises = imageIds.map((imageId, imageIndex) => external.cornerstone.loadImage(imageId).then((image) => {
    const dataSet = image.data;
    metaData.sliceThickness = dataSet.floatString('x00180050');
    metaData.pixelSpacing = dataSet.string('x00280030').split('\\').map(parseFloat);
    metaData.KVP = dataSet.floatString('x00180060');
    metaData.rescaleSlope = dataSet.floatString('x00281053');
    metaData.rescaleIntercept = dataSet.floatString('x00281052');
    metaData.rescaleType = dataSet.string('x00281054');
    const sliceLocation = dataSet.floatString('x00201041');
    const imagePositionPatient = dataSet.string('x00200032').split('\\').map(parseFloat);
    const imageOrientationTmp = dataSet.string('x00200037').split('\\').map(parseFloat);
    const imageOrientation = [
      imageOrientationTmp.slice(0, 3),
      imageOrientationTmp.slice(3)
    ];
    if (metaData.rescaleType !== 'HU') {
      console.warn(`Modality LUT does not convert to Hounsfield units but to ${metaData.rescaleType}. Agatston score is not defined for this unit type.`);
      return;
    }

    if (prevImagePosition) {
      const distance = computeIOPProjectedDistance([prevImagePosition, imagePositionPatient], imageOrientation);
      overlapFactor = computeOverlapFactor(distance, metaData.sliceThickness);

      // Find overlapfactor with the highest occurance
      overlapFactors.push(overlapFactor);
      metaData.modeOverlapFactor = mode(overlapFactors);

      // Save imagePositionPatient for next overlapFactor computation
      prevImagePosition = imagePositionPatient;
    } else {
      prevImagePosition = imagePositionPatient;
    }

    const width = image.width;
    const height = image.height;
    const sliceSize = width * height;
    const pixelData = image.getPixelData();
    const offset = imageIndex * sliceSize;

    var searchMatrix = []
    for (let i = 0; i < height; i += 1) {
      searchMatrix[i] = view.slice(offset + width * i, offset + width * i + width);
    }
    const clonedSearchMatrix = cloneDeep(searchMatrix)
    let colorStart = 2
    let numberOfColors = 5
    for (let i = 0; i < clonedSearchMatrix.length; i += 1) {
      for (let j = 0; j < clonedSearchMatrix[i].length; j += 1) {
        let lesionVoxels = []
        let label = clonedSearchMatrix[j][i]
        if (clonedSearchMatrix[j] && (label > 1) &&
            bfs(i, j, clonedSearchMatrix, label, lesionVoxels, pixelData, metaData)) {
          voxelsEachRegion[label - 2][imageIndex].push(lesionVoxels)
          maxHUEachRegion[label - 2][imageIndex].push(Math.max.apply(null, lesionVoxels))
        }
      }
    }

  }));

  return Promise.all(promises).then(function () {

    return voxelsEachRegion.map((slicesInLabel, labelIdx) => {
      const cascore = [];
      slicesInLabel.map((lesions, sliceIdx) => {
        lesions.map((voxels, lesionIdx) => {
          metaData.maxHU = maxHUEachRegion[labelIdx][sliceIdx][lesionIdx];
          let cascoreCurrent = computeScore(metaData, voxels);
          cascore.push(cascoreCurrent);
        })
      });
      console.log(cascore)
      let cascoreAccumulated = cascore.reduce((acc, val) => acc + val, 0);
      console.log("cascoreAccumulated: ", cascoreAccumulated);

      return cascoreAccumulated;
    });
  });
}

export default score
