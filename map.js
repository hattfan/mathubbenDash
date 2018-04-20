function createMap(width, height) {
  // d3.select("#map")
  //     .attr("width", width)
  //     .attr("height", height)
  //   .append("text")
  //     .attr("x", width / 2)
  //     .attr("y", "1em")
  //     .attr("font-size", "1.5em")
  //     .style("text-anchor", "middle")
  //     .classed("map-title", true);
}

function drawMap(geoData, kommunData) {



		// var subunits = topojson.feature(geoData, geoData.objects.sverige);

		// var counties = geoData.objects.sverige.geometries;
		// console.log(geoData)
		// debugger
			geoData.forEach(d => {
				
				// console.log(kommunData);
				var kommuner = kommunData.filter(row => row.kommunKod === d.properties.KNKOD);
				var name = '';
				// console.log(kommuner);
				if (kommuner.length > 0) name = kommuner[0].kommun;
				// console.log(name)
				//!KLART FRAM HIT
				// console.log(kommuner[0]);
				d.properties.data = kommunData[0].kopData || null ;
				// console.log(d)
			});

			var colors = ["#f1c40f", "#e67e22", "#e74c3c", "#c0392b"];

			var domain = [0, 0.5, 1.0, 1.5];
		
			var mapColorScale = d3.scaleLinear()
														.domain(domain)
														.range(colors);
		
			// var update = svg.selectAll(".kommun")
			// 								.data(geoData);
			console.log(geoData)

			var svg = d3.select('#map')

			var width = 960;
			var height = 600;

			var projection = d3.geoMercator()
			.scale(325)
			.translate([width / 2, height / 1])
			// .scale(150)
				// .translate([0, 0]);
	
			var path = d3.geoPath()
				.projection(projection);
	
			d3.select("svg")
        .attr("width", width)
        .attr("height", height)
      .selectAll(".kommun")
      .data(geoData)
      .enter()
        .append("path")
        .classed("kommun", true)
        .attr("d", path);



			// update
			// 	.enter()
			// 	.append('path')
			// 		.classed('kommun')
			// 		.attr('d', path)	
			// .merge(update)
			// 	.transition()
			// 	.duration(750)
			// 	.attr('fill', d => {
			// 		var val = d.properties;
			// 		return val ? mapColorScale(val) : '#ccc';
			// 	})
		// // var b = path.bounds(topojson.merge(geoData, counties)),
		// 	s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
		// 	t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

		// projection.scale(s).translate(t);
		// svg.selectAll('.munic')
		// 	.data(subunits.features)
		// 	.enter().append('path')
		// 	.attr('class', function (d) { return 'munic munic--' + d.properties.KNKOD; })
		// 	.attr('d', d3.geoPath().projection(projection));
	// })
};
