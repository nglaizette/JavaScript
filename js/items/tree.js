class Tree {
	constructor(center, size, heightCoefficient = 0.3){
		this.center = center;
		this.size = size; // size of the base
		this.heightCoefficient = heightCoefficient
	}

	draw(ctx, viewPoint) {
		const difference = substract(this.center, viewPoint);
		const top = add(this.center, scale(difference, this.heightCoefficient));
		const levelCount = 7;
		for(let level = 0; level < levelCount; level++){
			const t = level / (levelCount -1);
			const point = lerp2D(this.center, top, t);
			point.draw(ctx, {size: this.size, color: "green"});
		}
		new Segment(this.center, top).draw(ctx);


	}
}