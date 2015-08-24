var React = require('react');
var InfiniteScroller = require('./InfiniteScroller.js');

function getFakeRowsWithHeights (numberOfRows) {
   var newFakeRows = [];
   for (var i = 0; i < numberOfRows; i++) {
     newFakeRows.push({height: Math.floor(1000*Math.random())});
   }
   return newFakeRows;
 }

var App = React.createClass({
  getNewRandomRow: function (totalRows) {
    return {row: Math.floor(totalRows * Math.random())};
  },

  getInitialState: function() {
    return {
      rowToJumpTo: null,
      newRowToJumpTo: this.getNewRandomRow(100),
      fakeRows: getFakeRowsWithHeights(100)
    };
  },
  render: function () {
    var self = this;
    function renderRow (rowNumber) {
        var a = 0;
        // for (var i = 0; i < 1000000; i++) { //uncomment this code to simulate a complicated row rendering
        //     a++;
        // }
        var heightOfRow = self.state.fakeRows[rowNumber].height;
        return (
            <div 
                key={rowNumber} 
                style={{height: heightOfRow, background: heightOfRow % 2 === 0 ? 'red' : 'orange'}}
                > 
                {heightOfRow}
            </div>);
    }
    var randomRow = Math.floor(self.state.fakeRows.length * Math.random())
    return (
      <div overflow='scroll'>
        <button onClick={function (argument) {
          self.setState({
            rowToJumpTo: self.state.newRowToJumpTo,
            newRowToJumpTo: self.getNewRandomRow()
            // newRowToJumpTo: self.getNewRandomRow()
          });
        }}>
          Jump to a random row: Row #{self.state.newRowToJumpTo.row} (its height is {self.state.fakeRows[self.state.newRowToJumpTo.row]})
        </button>
        <button onClick={function (argument) {
          self.setState({
            fakeRows: getFakeRowsWithHeights(100),
          });
        }}>
          Create new rows
        </button>
        <InfiniteScroller
              averageElementHeight={100} //this is a guess you make!
              containerHeight={600}
              rowToJumpTo={this.state.rowToJumpTo} //(optional) row you want to jump to. Must be passed as a new object each time to allow for difference checking 
              renderRow={renderRow} //function to render a row
              totalNumberOfRows={self.state.fakeRows.length} //an array of data for your rows
              preloadRowStart={10} //if you want to start at a particular row to begin with
              />
      </div>
    );
  }
});

//tnr: instead of rendering, we should probably just mock this element..
React.render(<App />, document.getElementById('container'));


debugger;