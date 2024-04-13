class Tree {
	constructor(center, size, heightCoefficient = 0.3){
		this.center = center;
		this.size = size; // size of the base
		this.heightCoefficient = heightCoefficient
	}

	draw(ctx, viewPoint) {
		const difference = substract(this.center, viewPoint);
		this.center.draw(ctx, {size: this.size, color: "green"});

		const top = add(this.center, scale(difference, this.heightCoefficient));
		new Segment(this.center, top).draw(ctx);
	}
}