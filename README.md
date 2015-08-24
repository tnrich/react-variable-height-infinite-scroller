# react-variable-height-infinite-scroller

An infinite scroller especially made for variable row heights (no precomputation of row height necessary).

See a [Demo](http://tnrich.github.io/react-variable-height-infinite-scroller/)

# Why

Because sometimes you don't know the size of the row's you're going to render before rendering

# Install: 

npm i --save react-variable-height-infinite-scroller

# Useage:

Taken from the demo code: 

```javascript
var React = require('react');
var InfiniteScroller = require('./InfiniteScroller.js');
var fakeRowHeights = [3,35,369,37,38,39,40,41,42,4388,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67, 123,188,12,122,616,234,636,755,432,112,443,69,77,88,89,99,111,222,333,444,55,555,6654];

var App = React.createClass({
  getNewRandomRow: function (argument) {
    return {row: Math.floor(fakeRowHeights.length * Math.random())};
  },
  // getNewRandomRow: function (argument) {
  //   return Math.floor(fakeRowHeights.length * Math.random());
  // },
  getInitialState: function() {
    return {
      rowToJumpTo: null,
      newRowToJumpTo: this.getNewRandomRow()
    };
  },
  render: function () {
    var self = this;
    function renderRow (rowNumber) {
        var a = 0;
        // for (var i = 0; i < 1000000; i++) { //uncomment this code to simulate a complicated row rendering
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
            rowToJumpTo: self.state.newRowToJumpTo,
            newRowToJumpTo: self.getNewRandomRow()
            // newRowToJumpTo: self.getNewRandomRow()
          });
        }}>
          Jump to a random row: Row #{self.state.newRowToJumpTo.row} (its height is {fakeRowHeights[self.state.newRowToJumpTo.row]})
        </button>
        <InfiniteScroller
              averageElementHeight={100} //this is a guess you make!
              containerHeight={600}
              rowToJumpTo={this.state.rowToJumpTo} //(optional) row you want to jump to. Must be passed as a new object each time to allow for difference checking 
              renderRow={renderRow} //function to render a row
              totalNumberOfRows={fakeRowHeights.length} //an array of data for your rows
              preloadRowStart={10} //if you want to start at a particular row to begin with
              />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('container'));
```
