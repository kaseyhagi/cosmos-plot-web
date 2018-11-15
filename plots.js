// using plotly.js
// used from example: https://plot.ly/javascript/time-series/
//first plot
var csvfile = "example_data/data-2018-08-02T151119-plot-arduino.csv"
Plotly.d3.csv(csvfile, function(err, rows){

    function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }


  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'AAPL High',
    x: unpack(rows, 'time'),
    y: unpack(rows, 'node-arduino:device_tsen_temp_000'),
    line: {color: '#17BECF'}
  }



  var data = [trace1];

  var layout = {
    title: 'Node-arduino',
  };

  Plotly.newPlot('first_plot', data, layout);
  })
// end first plot

function rand() {
  return Math.random();
}

var time = new Date();

var data = [{
  x: [time],
  y: [rand],
  mode: 'lines',
  line: {color: '#80CAF6'}
}]

Plotly.plot('graph', data);

var cnt = 0;

var interval = setInterval(function() {

  var time = new Date();

  var update = {
  x:  [[time]],
  y: [[rand()]]
  }

  var olderTime = time.setMinutes(time.getMinutes() - 1);
  var futureTime = time.setMinutes(time.getMinutes() + 1);

  var minuteView = {
        xaxis: {
          type: 'date',
          range: [olderTime,futureTime]
        }
      };

  Plotly.relayout('graph', minuteView);
  Plotly.extendTraces('graph', update, [0])

  if(cnt === 100) clearInterval(interval);
}, 1000);
