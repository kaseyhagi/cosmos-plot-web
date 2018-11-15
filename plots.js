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
