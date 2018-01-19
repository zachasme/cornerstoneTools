import { external } from '../externalModules.js';
import { getToolState } from '../stateManagement/toolState';

function enable (element) {
  console.log('ENABLE UNDO');
  const thresholdingData = getToolState(element, 'regions');
  const state = thresholdingData.data[0];

  if (state.history.length < 1) {
    return;
  }

  const replacement = state.history.pop();

  console.log('HIST', state.history);

  state.buffer = replacement;
  external.cornerstone.updateImage(element);
}

function disable (element) {
  // Pass
}

// Module/private exports
export default {
  activate: enable,
  deactivate: disable,
  enable,
  disable
};
