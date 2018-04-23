function drawMap(geoData) {
	var width = 1000,
		height = 1000;

	var svg = d3.select('body').append('svg')
		.attr('width', width)
		.attr('height', height);

	d3.json('sverige.topojson', function (data) {
		var map = d3.select("#map");
		
		var subunits = topojson.feature(geoData, geoData.objects.sverige);

		var counties = geoData.objects.sverige.geometries;

		var projection = d3.geoMercator()
		.scale(1)
		.translate([0, 0]);

		var path = d3.geoPath()
			.projection(projection);

			//! HIT ÄR DET SAMMA

		var b = path.bounds(topojson.merge(data, counties)),
			s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
			t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

		projection.scale(s).translate(t);
		console.log(data)
		svg.selectAll('.munic')
			.data(subunits.features)
			.enter().append('path')
			.attr('class', function (d) { return 'munic munic--' + d.properties.KNKOD; })
			.attr('d', d3.geoPath().projection(projection));
	})
};
