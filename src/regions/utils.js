import { getToolState } from '../stateManagement/toolState.js';
import { TYPED_ARRAY } from './constants.js';

export function getView (element, slice) {
  const { width, height } = image;

  const regionsToolData = getToolState(element, 'regions');

  // Extract tool data
  const { buffer } = regionsToolData.data[0];

  const sliceSize = width * height;
  const sliceOffset = slice * sliceSize;
  const view = new TYPED_ARRAY(buffer, sliceOffset, sliceSize);

  return view;
}
