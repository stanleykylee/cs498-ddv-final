var diameter = 600,
    format = d3.format(",d")
    color = d3.scaleOrdinal(d3.schemeCategory20c);

var bub_svg = d3.select('#graph').append('svg')
                .attr('width', diameter)
                .attr('height', diameter)
                .attr("class", "bubble");
            
d3.csv("data/yelp_academic_dataset_business-massaged.csv", function(data) {
    console.log(data[0]);
    var reviewsByState = d3.nest()
        .key(function(d) { return d.State; })
        .rollup(function(leaves) { return {"reviewsByState": d3.sum(leaves, function(d) {return parseFloat(d['Review Count']);})} })
        .entries(data);
    console.log(reviewsByState);
    var reviewData = [];
    reviewsByState.forEach(function(d) { 
        reviewData.push({state: d.key, reviews: d.value['reviewsByState']});
        // reviewData[d.key] = d.value['reviewsByState']; 
        console.log(d.key, d.value['reviewsByState']);
        });
    console.log(reviewData);
    dataset = {children:reviewData}
    console.log(dataset);
    
    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var nodes = d3.hierarchy(dataset)
        .sum(function(d) { return d.reviews; });

    var node = bub_svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){ return !d.children })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.data.state + ": " + d.data.reviews; });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.data.state); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("font-size", function(d) { return d.r + "px"; })
        .text(function(d) { return d.data.state; });

    d3.select(self.frameElement)
        .style("height", diameter + "px");
    
});