d3.json("./samples.json").then(function(Data){
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

//text labels
    otu_labels = samples[0].otu_labels

//x_values
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


//setting down plots
    var og_trace = {
        type: "scatter",
        mode: 'markers',
        name: 940,
        x: x_otu_id,
        y: y_values,
        text: otu_labels,
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
        text: otu_labels,
        orientation: "h",
        marker:{
                color: "brown"
                }

    }

    //set gauge
var gauge_data = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: demo_data.wfreq,
		title: { text: "Belly Button Wash Frequency" },
		type: "indicator",
		mode: "gauge+number",
        gauge: {
            axis: {range: [0, 9]},
            bar: { color: "brown" },
            bgcolor: "white",
            borderwidth: 1,

        steps: [
            { range: [0, 1], color: "olive"},
            { range: [1, 2], color: "458B00" },
            { range: [2, 3], color: "66CD00" },
            { range: [3, 4], color: "76EE00" },
            { range: [4, 5], color: "7FFF00" },
            { range: [5, 6], color: "00FF7F" },
            { range: [6, 7], color: "aquamarine" },
            { range: [7, 8], color: "aqua" },
            { range: [8, 9], color: "royalblue"}],
        
        }
        
        }
];

var layout = { 
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 }
    };
    }
    
    var data = [og_trace];
    var bardata = [bar_og_trace]
    Plotly.newPlot("plot", data);
    Plotly.newPlot("bar", bardata);
    Plotly.newPlot('gauge', gauge_data, layout);

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

            //text labels
            otu_labels = samples[i].otu_labels

            var tracechange = {
                type: "scatter",
                mode: 'markers',
                name: samples[i].id,
                x: x_otu_id,
                y: y_values,
                text: otu_labels,
                marker: {
                        size: y_values,
                        color: x_otu_id,
                        colorscale:"turbid"
                        }
                    };

//make changing bar plot 
sorted_y_values = y_values.sort(function(a, b) {
    return parseFloat(b.y_values) - parseFloat(a.y_values);
  });
  //  Slice the first 10 objects for plotting
     sliced_y_values = sorted_y_values.slice(0, 10)
 // have to reverse 
     sliced_y_values = sliced_y_values.reverse();
 
     console.log(sliced_y_values)
 
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

     var bar_change = {
        type: "bar",
        x: sliced_y_values,
        y: otus,
        text: otu_labels,
        orientation: "h",
        marker:{
                color: "brown"
                }
    }

    var gauge_change = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: demo_data.wfreq,
            title: { text: "Belly Button Wash Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0, 9]},
                bar: { color: "brown" },
                bgcolor: "white",
                borderwidth: 1,
    
            steps: [
                { range: [0, 1], color: "olive"},
                { range: [1, 2], color: "458B00" },
                { range: [2, 3], color: "66CD00" },
                { range: [3, 4], color: "76EE00" },
                { range: [4, 5], color: "7FFF00" },
                { range: [5, 6], color: "00FF7F" },
                { range: [6, 7], color: "aquamarine" },
                { range: [7, 8], color: "aqua" },
                { range: [8, 9], color: "royalblue"}],
            
            }
            
            }
    ];
    
    var layout = { 
        width: 600, 
        height: 500, 
        margin: { t: 0, b: 0 }
        };
        }}
                
            var data = [tracechange]
            var bardata = [bar_change]
    Plotly.newPlot("plot", data)
    Plotly.newPlot("bar", bardata)
    Plotly.newPlot("gauge", gauge_change, layout);
    // Plotly.restyle("plot", "x", [x_otu_id]) 
    // Plotly.restyle("plot", "y", [y_values]) 

 
}}

init();
});
