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

  // console.log(values_list)
  // console.log(labels_list)
  // console.log(hovertext_list)

  var mergevalues = values_list.flat(1);
  // console.log(mergevalues);

  var mergelabels = labels_list.flat(1);
  // console.log(mergelabels)

  var mergehovertext = hovertext_list.flat(1);
  // console.log(mergehovertext)



information = {
  values: mergevalues,
  labels: mergelabels,
  hovertexts: mergehovertext
}


console.log(information.values)
  // Sort the data array 
 information.values.sort(function(a, b) {
   return parseFloat(b.values) - parseFloat(a.values);
 });


  // // // Slice the first 10 objects for plotting
    slicedvalues = information.values.slice(0, 10);

    console.log(slicedvalues[1])
    

//   // Reverse the array due to Plotly's defaults
    slicedvalues = slicedvalues.reverse();

    sliced_id = []
    sliced_hovertexts = []

    for (var i = 0; i < information.values.length; i++){
      for (var j = 0; j < slicedvalues.length; j++){
        if (slicedvalues[j]==information.values[i]){
          var sliced_otu_id = information.labels[i]
          sliced_id.push(sliced_otu_id)
          var sliced_hover = information.hovertexts[i]
          sliced_hovertexts.push(sliced_hover)
        }
      }
    }
console.log(sliced_id)
console.log(sliced_hovertexts)

sliced_id[1].toString()

otus = []

for (var i = 0; i < sliced_id.length; i++){
  var otu = sliced_id[i].toString()
  otu_id = `OTU ${otu}`
  otus.push(otu_id)
}

console.log(otus)

  var trace1 = {
    x: slicedvalues,
    y: otus,
    text: sliced_hovertexts,
    name: "Greek",
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "Greek gods search results",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", chartData, layout);
});
  //need to figure out how to pull in data...
  //then want to make traces
  //then connect them to drop down

