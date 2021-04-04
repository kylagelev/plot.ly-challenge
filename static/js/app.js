d3.json("samples.json").then(function(ImportedData){
    var data = ImportedData
    //console.log(data.samples)
    //console.log(data.samples[1].otu_ids[1])

    //used variable for easier locating
    var samples = data.samples

    //testing
    console.log(samples[1])
  
    var values_list = []
    var labels_list = []
    var hovertext_list = []

    //for loop to retrieve values
  for (var i = 0; i < samples.length; i++){
    var values = samples[i].sample_values
    values_list.push(values)
    var labels = samples[i].otu_ids
    labels_list.push(labels)
    var hovertext = samples[i].otu_labels
    hovertext_list.push(hovertext)
  }

  console.log(values_list)
  console.log(labels_list)
  console.log(hovertext_list)

  var mergevalues = values_list.flat(1);
  console.log(mergevalues);

  var mergelabels = labels_list.flat(1);
  console.log(mergelabels)

  var countUnique = mergevalues => {
    var counts = {};
    for (var i = 0; i < mergevalues.length; i++) {
       counts[mergevalues[i]] = 1 + (counts[mergevalues[i]] || 0);
    };
    return counts;
 };
 console.log(countUnique(values));




  // Sort the data array 
  mergevalues.sort(function(a, b) {
    return parseFloat(b.mergevalues) - parseFloat(a.mergevalues);
  });


  // // // Slice the first 10 objects for plotting
    slicedvalues = mergevalues.slice(0, 10);

    console.log(slicedvalues)
    

//   // Reverse the array due to Plotly's defaults
    // slicedvalues = slicedvalues.reverse();

  // var trace1 = {
  //   x: slicedvalues,
  //   y: ,
  //   text: hovertext,
  //   name: "Greek",
  //   type: "bar",
  //   orientation: "h"
  // };

//   // data
//   var chartData = [trace1];

//   // Apply the group bar mode to the layout
//   var layout = {
//     title: "Greek gods search results",
//     margin: {
//       l: 100,
//       r: 100,
//       t: 100,
//       b: 100
//     }
//   };

//   // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("bar", chartData, layout);
});
  //need to figure out how to pull in data...
  //then want to make traces
  //then connect them to drop down


