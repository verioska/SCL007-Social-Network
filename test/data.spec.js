
/* lo siguiente es de mi proyecto dataLovers

global.window = window;
global.assert = require("chai").assert;
require('../src/data.js');
require('../src/data/pokemon/pokemon.js');
require('./data.spec.js');
 
const arr = [{"num":2, "str":"B", "type":["A", "B"]}, {"num":3, "str":"A", "type":["B", "C"]}, {"num":1, "str":"D", "type":["C", "A"]}, {"num":4, "str":"C", "type":["B", "A"]}];

describe('processData', () => {
  it('is an object', () => {
    expect(typeof window.processData).toBe('object');
  });

  it('is a function', () => {
    expect(typeof window.processData.filterData).toBe('function');
  });

  it('is a function', () => {
    expect(typeof window.processData.sortData).toBe('function');
  });

  it('is a function', () => {
    expect(typeof window.processData.percentageFilteredData).toBe('function');
  });
  
  it('returns `[{"num":2, "str":"B", "type":["A", "B"]}, {"num":3, "str":"A", "type":["B", "C"]}, {"num":1, "str":"C", "type":["B", "A"]}]`', () => {
    window.assert.deepEqual(window.processData.filterData(arr, "B"), [{"num":2, "str":"B", "type":["A", "B"]}, {"num":3, "str":"A", "type":["B", "C"]}, {"num":4, "str":"C", "type":["B", "A"]}]);
  });

  it('returns `[{"num":3, "str":"A", "type":["B", "C"]}, {"num":1, "str":"C", "type":["C", "A"]}]`', () => {
    window.assert.deepEqual(window.processData.filterData(arr, "C"), [{"num":3, "str":"A", "type":["B", "C"]}, {"num":1, "str":"D", "type":["C", "A"]}]);
  }); 

  it('returns `[{"num":1, "str":"D", "type":["C", "A"]}, {"num":2, "str":"B", "type":["A", "B"]}, {"num":3, "str":"A", "type":["B", "C"]}, {"num":4, "str":"C", "type":["B", "A"]}]`', () => {
    window.assert.deepEqual(window.processData.sortData(arr, "num", true), [{"num":1, "str":"D", "type":["C", "A"]}, {"num":2, "str":"B", "type":["A", "B"]}, {"num":3, "str":"A", "type":["B", "C"]}, {"num":4, "str":"C", "type":["B", "A"]}]);
  });  

  it('returns `[{"num":3, "str":"A", "type":["B", "C"]}, {"num":2, "str":"B", "type":["A", "B"]}, {"num":4, "str":"C", "type":["B", "A"]}, {"num":1, "str":"D", "type":["C", "A"]}]`', () => {
    window.assert.deepEqual(window.processData.sortData(arr, "str", true), [{"num":3, "str":"A", "type":["B", "C"]}, {"num":2, "str":"B", "type":["A", "B"]}, {"num":4, "str":"C", "type":["B", "A"]}, {"num":1, "str":"D", "type":["C", "A"]}]);
  });

  it('returns `[{"num":4, "str":"C", "type":["B", "A"]}, {"num":3, "str":"A", "type":["B", "C"]}, {"num":2, "str":"B", "type":["A", "B"]}, {"num":1, "str":"D", "type":["C", "A"]}]`', () => {
    window.assert.deepEqual(window.processData.sortData(arr, "num", false), [{"num":4, "str":"C", "type":["B", "A"]}, {"num":3, "str":"A", "type":["B", "C"]}, {"num":2, "str":"B", "type":["A", "B"]}, {"num":1, "str":"D", "type":["C", "A"]}]);
  }); 

  it('returns `[{"num":1, "str":"D", "type":["C", "A"]}, {"num":4, "str":"C", "type":["B", "A"]}, {"num":2, "str":"B", "type":["A", "B"]}, {"num":3, "str":"A", "type":["B", "C"]}]`', () => {
    window.assert.deepEqual(window.processData.sortData(arr, "str", false), [{"num":1, "str":"D", "type":["C", "A"]}, {"num":4, "str":"C", "type":["B", "A"]}, {"num":2, "str":"B", "type":["A", "B"]}, {"num":3, "str":"A", "type":["B", "C"]}]);
  });

  it('returns `20.00`', () => {
    window.assert.deepEqual(window.processData.percentageFilteredData([4,4], [2,3,3,4,7,5,2,4,1,5]), "20.00");
  });
     
}); 
*/
