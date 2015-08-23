var React = require('react');
var InfiniteScroller = require('./InfiniteScroller.js');
var fakeRowHeights = [3,35,369,37,38,39,40,41,42,4388,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67, 123,188,12,122,616,234,636,755,432,112,443,69,77,88,89,99,111,222,333,444,55,555,6654];
// var fakeRowHeights = [55,44,40];

var App = React.createClass({
  getNewRandomRow: function (argument) {
    return Math.floor(fakeRowHeights.length * Math.random());
  },
  getInitialState: function() {
    return {
      rowJumpTrigger: null,
      rowToJumpTo: null,
      newRowToJumpTo: this.getNewRandomRow()
    };
  },
  render: function () {
    var self = this;
    function renderRow (rowNumber) {
        var a = 0;
        // for (var i = 0; i < 1000000; i++) {
        //     a++;
        // }
        var dataItem = fakeRowHeights[rowNumber];
        return (
            <div 
                key={rowNumber} 
                style={{height: dataItem, background: dataItem % 2 === 0 ? 'red' : 'orange'}}
                > 
                {dataItem}
            </div>);
    }
    var randomRow = Math.floor(fakeRowHeights.length * Math.random())
    return (
      <div overflow='scroll'>
        <button onClick={function (argument) {
          self.setState({
            rowJumpTrigger: (self.state.rowJumpTrigger) ? false : true,
            rowToJumpTo: self.state.newRowToJumpTo,
            // newRowToJumpTo: 30
            newRowToJumpTo: self.getNewRandomRow()
          });
        }}>
          Jump to a random row: Row #{self.state.newRowToJumpTo} (its height is {fakeRowHeights[self.state.newRowToJumpTo]})
        </button>
        <InfiniteScroller
              averageElementHeight={100}
              containerHeight={600}
              rowToJumpTo={this.state.rowToJumpTo}
              rowJumpTrigger={this.state.rowJumpTrigger}
              renderRow={renderRow}
              totalNumberOfRows={fakeRowHeights.length}
              preloadRowStart={10}
              />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('container'));