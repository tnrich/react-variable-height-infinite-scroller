import React from 'react';
import InfiniteScroller from './InfiniteScroller.js';
function getFakeRowsWithHeights(numberOfRows) {
  let newFakeRows = [];
  for (let i = 0; i < numberOfRows; i++) {
    newFakeRows.push({height: Math.floor(1000 * Math.random())});
  }
  return newFakeRows;
}

const Example2 = React.createClass({
  getInitialState() {
    // const newNumberOfRowsToDisplay = Math.floor(Math.random() * 200);
    const newNumberOfRowsToDisplay = 10;
    const newFakeRows = getFakeRowsWithHeights(newNumberOfRowsToDisplay);
    return {
      rowToJumpTo: {row: 9},
      newRowToJumpTo: {row: 9},
      fakeRows: newFakeRows,
    };
  },
  render() {
    // const newNumberOfRowsToDisplay = Math.floor(Math.random() * 200);
    const newNumberOfRowsToDisplay = 10;
    return (
      <div style={{width: 300}} overflow="scroll">
        <h3>
          Example 2: 10 rows of random height with last row the "rowToJumpTo"
        </h3>
        <button onClick={() => {
          this.setState({
            rowToJumpTo: this.state.newRowToJumpTo,
            newRowToJumpTo: {row: 9},
          });
        }}>
          Jump to the last row: Row #{this.state.newRowToJumpTo.row} (its height is {this.state.fakeRows[this.state.newRowToJumpTo.row].height})
        </button>
        <button onClick={() => {
          const newFakeRows = getFakeRowsWithHeights(newNumberOfRowsToDisplay);
          this.setState({
            fakeRows: newFakeRows,
            newRowToJumpTo: {row: 9},
          });
        }}>
          Create {newNumberOfRowsToDisplay} new rows
        </button>
        <InfiniteScroller
          averageElementHeight={100} // this is a guess you make!
          containerHeight={600}
          rowToJumpTo={this.state.rowToJumpTo} // (optional) row you want to jump to. Must be passed as a new object each time to allow for difference checking
          renderRow={this.renderRow} // function to render a row
          totalNumberOfRows={this.state.fakeRows.length} // an array of data for your rows
        />
      </div>
    );
  },

  renderRow(rowNumber) {
    const heightOfRow = this.state.fakeRows[rowNumber].height;
    return (
      <div
        key={rowNumber}
        style={{height: heightOfRow, background: rowNumber % 2 === 0 ? 'red' : 'orange'}}
      >
        Height: {heightOfRow}
        <br/>
        Row Number: {rowNumber}
      </div>
    );
  },
});

export default Example2;
