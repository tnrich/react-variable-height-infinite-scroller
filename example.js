import React from 'react';
import InfiniteScroller from './InfiniteScroller.js';

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
    const newNumberOfRowsToDisplay = Math.floor(Math.random() * 200);
    return (
      <div overflow="scroll">
        <button onClick={() => {
          this.setState({
            rowToJumpTo: this.state.newRowToJumpTo,
            newRowToJumpTo: this.getNewRandomRow(this.state.fakeRows.length),
          });
        }}>
          Jump to a random row: Row #{this.state.newRowToJumpTo.row} (its height is {this.state.fakeRows[this.state.newRowToJumpTo.row].height})
        </button>
        <button onClick={() => {
          this.setState({
            fakeRows: getFakeRowsWithHeights(newNumberOfRowsToDisplay),
          });
        }}>
          Create {newNumberOfRowsToDisplay} new rows
        </button>
        <InfiniteScroller
          averageElementHeight={100} // this is a guess you make!
          containerHeight={600}
          rowToJumpTo={this.state.rowToJumpTo} // (optional) row you want to jump to. Must be passed as a new object each time to allow for difference checking
          renderRow={renderRow} // function to render a row
          totalNumberOfRows={this.state.fakeRows.length} // an array of data for your rows
          preloadRowStart={10} // if you want to start at a particular row to begin with
        />
      </div>
    );
  },

  renderRow(rowNumber) {
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

React.render(<App />, document.getElementById('container'));
