class Segment {
	constructor(p1, p2) {
		this.point1 = p1;
		this.point2 = p2;
	}

	equals(segment) {
		return this.includes(segment.point1) && this.includes(segment.p2);
	}

	/** vérification si un point est inclus dans le segment */
	includes(point){
		return this.point1.equals(point) || this.point2.includes(point);
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