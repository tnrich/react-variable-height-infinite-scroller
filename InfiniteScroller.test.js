// var jsdom = require('jsdom-compat');
// require('testdom')('<html><body></body></html>')

// console.log('global.window: ' + global.window);
// console.log('global.document: ' + global.document);
// import React from 'react';
// // const React = require('react')
// // require('react/addons');
// // let TestUtils = React.addons.TestUtils;
// import testTree from 'react-test-tree';
// var jsdom = require('mocha-jsdom')
test('pause', function(t) {
  window.cont = t.end
});

import InfiniteScroller from './InfiniteScroller.js';
// var bro = require('jsdom-test-browser'),
        // assert = require('assert'),
import React from 'react';
import test from 'tape';
let TestUtils = require('react/addons').addons.TestUtils;

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

// describe('InfiniteScroller', function() {
//   it('should render an infinite scroller', function() {
//     // let appTree = testTree(<App/>);
//     let renderedComponent = TestUtils.renderIntoDocument(
//           <App/>
//         );
//     console.log('renderedComponent: ', renderedComponent);
//       // appTree.infScroller.getDOMNode();
//   });
// });
test('InfiniteScroller', function (t) {
    t.plan(2);
    debugger;
    let renderedComponent = TestUtils.renderIntoDocument(
          <App/>
        );
    console.log('renderedComponent: ', renderedComponent);
    let node = React.findDOMNode(renderedComponent.refs.infScroller.refs.infiniteContainer);
    TestUtils.Simulate.scroll();

   t.equal(typeof Date.now, 'function');
    var start = Date.now();

    setTimeout(function () {
        t.equal(Date.now() - start, 100);
    }, 100);
});
