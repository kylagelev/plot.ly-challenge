d3.json("../samples.json").then(function(Data){
    var data = Data

//testing variables created
    var samples = data.samples
    console.log(samples[0].id);

    var names = data.names
    console.log(names);
    
    var metadata = data.metadata
    console.log(metadata[0].ethnicity);

    if (samples[0].id == 940){
        console.log(samples[0].otu_ids)
    };

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

//pulling out demo data for 940 start value
for (var i = 0; i < metadata.length; i++){
    if (metadata[i].id === 940){
    demo_data = metadata[i]
    console.log(demo_data)
}

//output onto html
var output = document.getElementById('sample-metadata')
output.innerHTML = `<center>ID: ${demo_data.id} 
                    <br> 
                    Ethnicity: ${demo_data.ethnicity}
                    <br>
                    Gender: ${demo_data.gender} 
                    <br>
                    Age: ${demo_data.age} 
                    <br>
                    Location: ${demo_data.location} 
                    <br>
                    BBType: ${demo_data.bbtype}
                    <br>
                    Wfreq: ${demo_data.wfreq}</center>`

//set gauge
// var data = [
// 	{
// 		domain: { x: [0, 1], y: [0, 1] },
// 		value: 270,
// 		title: { text: "Speed" },
// 		type: "indicator",
// 		mode: "gauge+number"
// 	}
// ];

// var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
// Plotly.newPlot('gauge', data, layout);

//output of bar plot




//output of scatter graph
function init(){
    if (samples[0].id == 940){
// Use sample_values for the y values.
        y_values = samples[0].sample_values

//Sort the data array 
    sorted_y_values = y_values.sort(function(a, b) {
   return parseFloat(b.y_values) - parseFloat(a.y_values);
 });
 //  Slice the first 10 objects for plotting
    sliced_y_values = sorted_y_values.slice(0, 10)
// have to reverse 
    sliced_y_values = sliced_y_values.reverse();

    console.log(sliced_y_values)

    x_otu_id = samples[0].otu_ids

    sliced_x_values = x_otu_id.slice(0, 10)
    console.log(sliced_x_values)

//converting the otu_ids to strings... otherwise the graph read the values as numbers on the y-axis
    otus = []
    for (var i = 0; i < sliced_x_values.length; i++){
    var otu = sliced_x_values[i].toString()
    otu_id = `OTU ${otu}`
    otus.push(otu_id)
    }

//have to reverse otus values
    otus = otus.reverse();


    var og_trace = {
        type: "scatter",
        mode: 'markers',
        name: 940,
        x: x_otu_id,
        y: y_values,
        text: samples[0].otu_labels,
        marker: {
                size: y_values,
                color: x_otu_id,
                colorscale:"turbid"
                }
      };

    var bar_og_trace = {
        type: "bar",
        x: sliced_y_values,
        y: otus,
        orientation: "h",
        marker:{
                color: "brown"
                }

    }
    }
    var data = [og_trace];
    var bardata = [bar_og_trace]
    Plotly.newPlot("plot", data);
    Plotly.newPlot("bar", bardata)

}
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);


function updatePlotly() {
    var dropdownMenu = d3.select("#selDataset");
    var value = dropdownMenu.node().value;
    console.log(value)

    //pulling out demographic data
    for (var i = 0; i < metadata.length; i++){
        if (metadata[i].id == value){
            demo_data = metadata[i]
            console.log(demo_data)
    
        var output = document.getElementById('sample-metadata')
        output.innerHTML = `<center>ID: ${demo_data.id} 
                            <br> 
                            Ethnicity: ${demo_data.ethnicity}
                            <br>
                            Gender: ${demo_data.gender} 
                            <br>
                            Age: ${demo_data.age} 
                            <br>
                            Location: ${demo_data.location} 
                            <br>
                            BBType: ${demo_data.bbtype}
                            <br>
                            Wfreq: ${demo_data.wfreq}</center>`
        }
    };
//making x and y values for bubble
    for (var i = 0; i < samples.length; i++){
        if (samples[i].id == value){

            x_otu_id = samples[i].otu_ids
            y_values = samples[i].sample_values
            console.log(y_values)

            var tracechange = {
                type: "scatter",
                mode: 'markers',
                name: samples[i].id,
                x: x_otu_id,
                y: y_values,
                text: samples.otu_labels,
                marker: {
                        size: y_values,
                        color: x_otu_id,
                        colorscale:"turbid"
                        }
                    };

        }}
                
            var data = [tracechange]
    Plotly.newPlot("plot", data)
    // Plotly.restyle("plot", "x", [x_otu_id]) 
    // Plotly.restyle("plot", "y", [y_values]) 

 
}}

init();
});
