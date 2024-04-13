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

		}
		this.base.draw(ctx, { fill: "white", stroke: "#AAA"});
		ceiling.draw(ctx, { fill: "white", stroke: "#AAA"});
	}
}