jest.dontMock('../InfiniteScroller');

import React from 'react/addons';
const InfiniteScroller = require('../InfiniteScroller');
var TestUtils = React.addons.TestUtils;

describe('InfiniteScroller', () => {

  it('changes the text after click', () => {

    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <App />
    );

    var checkboxNode = React.findDOMNode(checkbox);

    // Verify that it's Off by default
    expect(checkboxNode.textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    TestUtils.Simulate.change(TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input'));
    expect(checkboxNode.textContent).toEqual('On');
  });

});

function getFakeRowsWithHeights(numberOfRows) {
  let newFakeRows = [];
  for (let i = 0; i < numberOfRows; i++) {
    newFakeRows.push({height: Math.floor(1000 * Math.random())});
  }
  return newFakeRows;
}

const App = React.createClass({
  getNewRandomRow(totalRows) {
    return {row: Math.floor(totalRows * Math.random())};
  },

  getInitialState() {
    return {
      rowToJumpTo: null,
      newRowToJumpTo: this.getNewRandomRow(100),
      fakeRows: getFakeRowsWithHeights(100),
    };
  },
  render() {
    return (
      <div overflow="scroll">
        <button onClick={() => {
          this.setState({
            rowToJumpTo: this.state.newRowToJumpTo,
            newRowToJumpTo: this.getNewRandomRow(),
            // newRowToJumpTo: this.getNewRandomRow()
          });
        }}>
          Jump to a random row: Row #{this.state.newRowToJumpTo.row} (its height is {this.state.fakeRows[this.state.newRowToJumpTo.row]})
        </button>
        <button onClick={() => {
          this.setState({
            fakeRows: getFakeRowsWithHeights(100),
          });
        }}>
          Create new rows
        </button>
        <InfiniteScroller
          ref="infScroller"
          averageElementHeight={100} // this is a guess you make!
          containerHeight={600}
          rowToJumpTo={this.state.rowToJumpTo} // (optional) row you want to jump to. Must be passed as a new object each time to allow for difference checking
          renderRow={this.renderRow} // function to render a row
          totalNumberOfRows={this.state.fakeRows.length} // an array of data for your rows
          preloadRowStart={10} // if you want to start at a particular row to begin with
        />
      </div>
    );
  },

  renderRow(rowNumber) {
    // let a = 0;
    // for (let i = 0; i < 1000000; i++) { //uncomment this code to simulate a complicated row rendering
    //     a++;
    // }
    const heightOfRow = this.state.fakeRows[rowNumber].height;
    return (
      <div
        key={rowNumber}
        style={{height: heightOfRow, background: heightOfRow % 2 === 0 ? 'red' : 'orange'}}
      >
        {heightOfRow}
      </div>
    );
  },
});