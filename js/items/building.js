class Building {
	constructor(polygon, heightCoefficient = 0.4){
		this.base = polygon;
		this.heightCoefficient = heightCoefficient;
	}

	draw(ctx, viewPoint) {
		const topPoints = this.base.points.map((point) => 
			add(point, scale(substract(point, viewPoint), this.heightCoefficient))
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

		this.base.draw(ctx, { fill: "white", stroke: "#AAA"});
		for(const side of sides){
			side.draw(ctx, {fill: "while", stroke: "#AAA"});
		}
		ceiling.draw(ctx, { fill: "white", stroke: "#AAA"});
	}
}