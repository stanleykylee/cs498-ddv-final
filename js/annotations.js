const annotations = [
{
    type: d3.annotationLabel,
    note: {
    title: "Weeknight Checkin Spike",
    label: "Spikes nightly for checkins",
    wrap: 190
    },
    x: 250,
    y: 125,
    dy: 0,
    dx: 0
},          
{
    type: d3.annotationLabel,
    note: {
    title: "Weekend Checkin Spike",
    label: "Increased spike of checkins over the weekend",
    wrap: 190
    },
    x: 650,
    y: 200,
    dy: -100,
    dx: -150
}]

const makeAnnotations = d3.annotation()
    .type(d3.annotationLabel)
    .annotations(annotations)

d3.select("#linechart_svg")
    .append("g")
    .attr("class", "annotation-group")
    .attr("id", "linechart_annotation")
    .call(makeAnnotations)
