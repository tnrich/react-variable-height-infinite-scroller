import React from 'react';
import InfiniteScroller from './InfiniteScroller.js';
import Example2 from './example2.js';
import Example3 from './example3.js';

function getFakeRowsWithHeights(numberOfRows) {
  let newFakeRows = [];
  for (let i = 0; i < numberOfRows; i++) {
    newFakeRows.push({height: Math.floor(1000 * Math.random())});
  }
  return newFakeRows;
}

const Example1 = React.createClass({
  getNewRandomRow(totalRows) {
    return {row: Math.floor(totalRows * Math.random())};
  },

  getInitialState() {
    const newNumberOfRowsToDisplay = Math.floor(Math.random() * 200);
    const newFakeRows = getFakeRowsWithHeights(newNumberOfRowsToDisplay);
    return {
      rowToJumpTo: null,
      newRowToJumpTo: this.getNewRandomRow(newFakeRows.length),
      fakeRows: newFakeRows,
    };
  },
  render() {
    const newNumberOfRowsToDisplay = Math.floor(Math.random() * 200);
    return (
      <div style={{width: 300}} overflow="scroll">
        <h3>
        Example 1: Random number of rows and row heights
        </h3>
        <button onClick={() => {
          this.setState({
            rowToJumpTo: this.state.newRowToJumpTo,
            newRowToJumpTo: this.getNewRandomRow(this.state.fakeRows.length),
          });
        }}>
          Jump to a random row: Row #{this.state.newRowToJumpTo.row} (its height is {this.state.fakeRows[this.state.newRowToJumpTo.row].height})
        </button>
        <button onClick={() => {
          const newFakeRows = getFakeRowsWithHeights(newNumberOfRowsToDisplay);
          this.setState({
            fakeRows: newFakeRows,
            newRowToJumpTo: this.getNewRandomRow(newFakeRows.length),
          });
        }}>
          Create {newNumberOfRowsToDisplay} new rows
        </button>

        <InfiniteScroller
          averageElementHeight={100} // this is a guess you make!
          containerHeight={600}
          rowToJumpTo={this.state.rowToJumpTo} // (optional) set this if you want to start/jump to a a particular row. Must be passed as a new object each time to allow for difference checking
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

React.render((
  <div style={{display: 'flex'}} >
    <Example1 />
    <div style={{width: 100}}/>
    <Example2 />
    <div style={{width: 100}}/>
    <Example3 />
  </div>
  ), document.getElementById('container'));
