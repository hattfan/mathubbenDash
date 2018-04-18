function createMap(width, height) {
  d3.select("#map")
      .attr("width", width)
      .attr("height", height)
    .append("text")
      .attr("x", width / 2)
      .attr("y", "1em")
      .attr("font-size", "1.5em")
      .style("text-anchor", "middle")
      .classed("map-title", true);
}

function drawMap(geoData, data) {

	var svg = d3.select('#map')

		var projection = d3.geoMercator()
		.scale(1)
		.translate([0, 0]);

		var path = d3.geoPath()
			.projection(projection);


		var subunits = topojson.feature(geoData, geoData.objects.sverige);

		var counties = geoData.objects.sverige.geometries;
		
		console.log(data)		
		console.log(geoData)
		// geoData.forEach(d => {
			//!d.id = geoData.id kommer från kommunkoderna i geoData
			//!row.kommunKod skall komma ifrån all_data.csv i app.js som måste komma ifrån databasen
			// var kommuner = data.filter(row => row.kommunKod === d.id)
			// console.log(d)
		// });
			//! HIT ÄR DET SAMMA

		var b = path.bounds(topojson.merge(geoData, counties)),
			s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
			t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

		projection.scale(s).translate(t);
		svg.selectAll('.munic')
			.data(subunits.features)
			.enter().append('path')
			.attr('class', function (d) { return 'munic munic--' + d.properties.KNKOD; })
			.attr('d', d3.geoPath().projection(projection));
	// })
};
