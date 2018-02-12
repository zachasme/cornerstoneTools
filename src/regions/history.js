import { getToolState } from '../stateManagement/toolState';
import { external } from '../externalModules.js';

const configuration = {};

/**
 * Store current state to history
 */
function createUndoStep (element) {
  const thresholdingData = getToolState(element, 'regions');

  const state = thresholdingData.data[0];
  // Make a copy using .slice()
  const current = state.buffer.slice();

  // Put at end of history
  state.history.push(current);
  // Remove oldest if too much history
  if (state.history.length > configuration.historySize) {
    state.history.shift();
  }
}

function undo (element) {
  const thresholdingData = getToolState(element, 'regions');
  const state = thresholdingData.data[0];

  if (state.history.length < 1) {
    return;
  }

  const replacement = state.history.pop();

  state.buffer = replacement;
  external.cornerstone.updateImage(element);
}

function redo (element) {
  // Not implemented
}

// Module/private exports
export {
  undo, redo, createUndoStep
};
