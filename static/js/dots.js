d3.json("../samples.json").then(function(Data){
    var data = Data

    var names = data.names
    console.log(names)
    
    var metadata = data.metadata
    console.log(metadata)

//ok, so want to match id from metadata to get information to make bubble graph
//also subject id needs to match the name

var sel = document.getElementById('selDataset');
for(var i = 0; i < names.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = names[i];
    opt.value = names[i];
    sel.appendChild(opt);
}
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);


function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

}

});