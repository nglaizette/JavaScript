class Segment {
	constructor(p1, p2) {
		this.point1 = p1;
		this.point2 = p2;
	}

	draw(ctx, width = 2, color = "black") {
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
		ctx.moveTo(this.point1.x, this.point1.y);
		ctx.lineTo(this.point2.x, this.point2.y);
		ctx.stroke();
	}
}