class Building {
	constructor(polygon, height = 200){
		this.base = polygon;
		this.height = height;
	}

	draw(ctx, viewPoint) {
		const topPoints = this.base.points.map((point) => 
			getFake3dPoint(point, viewPoint, this.height * 0.6)
		);
		const ceiling = new Polygon(topPoints);

		const sides = [];
		for(let i = 0; i < this.base.points.length; i++){
			const nextI = (i+1) % this.base.points.length;
			const polygon = new Polygon([
				this.base.points[i], this.base.points[nextI],
				topPoints[nextI], topPoints[i]
			]);
			sides.push(polygon);
		}

		sides.sort((side1, side2) =>
			side2.distanceToPoint(viewPoint) -
			side1.distanceToPoint(viewPoint)
		);

		const baseMidPoints = [
			averagePoint(this.base.points[0], this.base.points[1]),
			averagePoint(this.base.points[2], this.base.points[3])
		]

		const topMidPoints = baseMidPoints.map((point)=>
			getFake3dPoint(point, viewPoint, this.height)
		);

		const roofPolygons = [
			new Polygon([
				ceiling.points[0], ceiling.points[3],
				topMidPoints[1], topMidPoints[0]
			]),
			new Polygon([
				ceiling.points[2], ceiling.points[1],
				topMidPoints[0], topMidPoints[1]
			]),
		];

		roofPolygons.sort((a, b)=>
			b.distanceToPoint(viewPoint) -
			a.distanceToPoint(viewPoint)
		);

		this.base.draw(ctx, { fill: "white", stroke: "rgba(0, 0, 0, 0.2)", lineWidth: 20});
		for(const side of sides){
			side.draw(ctx, {fill: "while", stroke: "#AAA"});
		}
		ceiling.draw(ctx, { fill: "white", stroke: "#AAA", lineWidth: 6});
		for(const roof of roofPolygons){
			roof.draw(ctx, {fill: "#D44", stroke: "#C44", lineWidth: 8, join: "round"})
		}
	}
}