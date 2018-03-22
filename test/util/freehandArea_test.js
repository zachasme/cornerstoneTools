import { expect } from 'chai';
import freeHandArea from '../../src/util/freeHandArea.js';

describe('#copyPoints', function () {
  let dataHandles;
  let scaling;
  const colPixelSpacing = 2.5;
  const rowPixelSpacing = 4;

  beforeEach(() => {
    dataHandles = [
      {
        x: 3,
        y: 4
      },
      {
        x: 5,
        y: 11
      },
      {
        x: 12,
        y: 8
      },
      {
        x: 9,
        y: 5
      },
      {
        x: 5,
        y: 6
      }
    ];
    scaling = (colPixelSpacing || 1) * (rowPixelSpacing || 1);
  });

  it('should not return the same object as a copy', function () {
    const area = freeHandArea(dataHandles, scaling);

    expect(area).to.be.equal(300);
  });
});
