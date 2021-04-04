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

//output of graph
function init(){
    if (samples[0].id == 940){
        x_otu_id = samples[0].otu_ids
    // Use sample_values for the y values.
        y_values = samples[0].sample_values
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
    }
    var data = [og_trace];
    Plotly.newPlot("plot", data);

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
