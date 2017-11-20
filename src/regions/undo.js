import * as cornerstone from 'cornerstone-core';
import { getToolState } from '../stateManagement/toolState';

function enable (element) {
  console.log("ENABLE UNDO");
  const thresholdingData = getToolState(element, 'regions');
  const state = thresholdingData.data[0];

  if (state.history.length < 1) {
    return;
  }

  const replacement = state.history.pop();
  console.log("HIST",state.history)

  state.buffer = replacement;
  cornerstone.updateImage(element);
}

function disable (element) {
  // pass
}

// Module/private exports
export default {
  activate: enable,
  deactivate: disable,
  enable,
  disable
};
