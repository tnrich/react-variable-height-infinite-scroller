var React = require('react');
var InfiniteScroller = require('../index');

var App = React.createClass({
  
  render: function () {
    var fakeRowHeights = [35,369,37,38,39,40,41,42,4388,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67, 123,188,12,122,616,234,636,755,432,112,443,69,77,88,89,99,111,222,333,444,55,555,6654];
    function renderRow (dataItem) {
        var a = 0;
        // for (var i = 0; i < 1000000; i++) {
        //     a++;
        // }
        return (
            <div 
                key={dataItem} 
                style={{height: dataItem, background: dataItem % 2 === 0 ? 'red' : 'orange'}}
                > 
                {dataItem}
            </div>);
    }
      
    return (
      <div overflow='scroll'>
        <InfiniteScroller
              averageElementHeight={100}
              containerHeight={600}
              renderRow={renderRow}
              rowData={fakeRowHeights}
              preloadRowStart={10}
              />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('container'));