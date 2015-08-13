# react-variable-height-infinite-scroller
variable row height scroller (no precomputation of row height necessary)

Demo: http://tnrich.github.io/react-variable-height-infinite-scroller/

#Why
Because sometimes you don't know the size of the row's you're going to render before rendering

#Useage: 
```javascript
var React = require('react');
var InfiniteScroller = require('../index');

var App = React.createClass({
  
  render: function () {
    var fakeRowHeights = [35,369,37,38,39,40,41,42,4388,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67, 123,188,12,122,616,234,636,755,432,112,443,69,77,88,89,99,111,222,333,444,55,555,6654];
    function renderRow (dataItem) {
        var a = 0;
        // for (var i = 0; i < 1000000; i++) { //uncomment this code to simulate a complicated row rendering
        //     a++;
        // }
        return (
            <div 
                key={dataItem} 
                style={{height: dataItem * 1.3, background: dataItem % 2 === 0 ? 'red' : 'orange'}} //multiplying heights by an arbitrary factor just to show that the heights being passed in aren't being used to adjust the scroll container
                > 
                {dataItem}
            </div>);
    }
      
    return (
      <div overflow='scroll'>
        <InfiniteScroller
              averageElementHeight={100} //this is a guess you make!
              containerHeight={600}
              renderRow={renderRow} //function to render a row
              rowData={fakeRowHeights} //an array of data for your rows
              preloadRowStart={10} //if you want to start at a particular row to begin with
              />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('container'));
```
