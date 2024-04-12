class Segment {
	constructor(p1, p2) {
		this.point1 = p1;
		this.point2 = p2;
	}

	length(){
		return distance(this.point1, this.point2);
	}

	directionVector(){
		return normalize(substract(this.point2, this.point1));
	}

	equals(segment) {
		return this.includes(segment.point1) && this.includes(segment.point2);
	}

	/** vérification si un point est inclus dans le segment */
	includes(point){
		return this.point1.equals(point) || this.point2.equals(point);
	}

	draw(ctx, {width = 2, color = "black", dash = []} = {}) {
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
		ctx.setLineDash(dash);
		ctx.moveTo(this.point1.x, this.point1.y);
		ctx.lineTo(this.point2.x, this.point2.y);
		ctx.stroke();
		ctx.setLineDash([]);
	}
}