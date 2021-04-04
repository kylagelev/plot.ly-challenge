d3.json("../samples.json").then(function(Data){
    var data = Data

    var names = data.names
    console.log(names)
    
    var metadata = data.metadata
    console.log(metadata[0])

//ok, so want to match id from metadata to get information to make bubble graph
//also subject id needs to match the name

//created drop down with array of names
var sel = document.getElementById('selDataset');
for(var i = 0; i < names.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = names[i];
    opt.value = names[i];
    sel.appendChild(opt);
}

function init() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("bubble", data);
  }

//pulling out demographic data

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);


function updatePlotly() {
    // Use D3 to select the dropdown menu
    // var dropdownMenu = d3.select("#selDataset");
    // // Assign the value of the dropdown menu option to a variable
    // var value = dropdownMenu.property(this.value)
    // console.log(value)
    var value = d3.select("#selDataset").node().value; 
    console.log(value)

    //pulling out demographic data
    for (var i = 0; i < metadata.length; i++){
        if (metadata[i].id === value){
            demo_data = metadata[i]
            console.log(demo_data)

        d3.selectAll('#sample-metadata').append(demo_data)
        }

    

    }
}
Plotly.restyle("bubble", "x", [x]);
Plotly.restyle("bubble", "y", [y]);
});

init();