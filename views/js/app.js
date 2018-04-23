// 4. make bar chart
// 5. tooltip!
var width = 1000;
var height = 1000;

// createMap(width, height)

d3.queue()
  .defer(d3.json, "../src/sverige.topojson")
  // .defer(d3.csv, "./data/all_data.csv", function(row) {
  .defer(d3.csv, "../../../data/kommunData.csv", function (row) {

    return {
      kommun: row.Kommun,
      kommunKod: row.Kommunkod,
      kopData: +row.Procent
    }
  })
  .await(function (error, mapData, data) {
    if (error) throw error;

    var geoData = topojson.feature(mapData, mapData.objects.sverige).features;
    drawMap(geoData, data)
  });


d3.selectAll("svg")
  .on("mousemove touchmove", updateTooltip);

function updateTooltip() {
  var tooltip = d3.select(".tooltip");
  var tgt = d3.select(d3.event.target);
  var isKommun = tgt.classed("kommun");
  var units = "korv";
  var test;
  var percentage = "";
  if (isKommun) console.log(tgt.data()[0].properties.data);
  
  if (isKommun) test = tgt.data()[0].properties;
  console.log(test)
  tooltip
          .style("opacity", +(isKommun))
          .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
          .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");
      
  if (test) {
    tooltip
      .html(`
        <p>Kommun: ${test.KNNAMN}</p>
        <p>Mängd: ${test.data} </p>
      `)
  }
};

function formatDataType(key) {
  return key[0].toUpperCase() + key.slice(1).replace(/[A-Z]/g, c => " " + c);
}