class Tree {
	constructor(center, size){
		this.center = center;
		this.size = size; // size of the base
	}

	draw(ctx, viewPoint) {
		const difference = substract(this.center, viewPoint);
		this.center.draw(ctx, {size: this.size, color: "green"});

		const top = add(this.center, {x: -40, y: -40});
		new Segment(this.center, top).draw(ctx);
	}
}