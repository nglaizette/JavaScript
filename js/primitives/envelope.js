class Envelope {
	constructor(skeleton, width){
		this.skeleton = skeleton;
		this.polygon = this.#generatePolygon(width);
	}

	#generatePolygon(width) {
		const { point1, point2} = this.skeleton;
		
		const radius = width / 2;
		const alpha = angle(substract(point1, point2)); // angle entre Point1 et Point2

		const alpha_clockwise = alpha + Math.PI / 2.0;
		const alpha_counterclockwise = alpha - Math.PI / 2.0;

		const point1_counterclockwise = translate(point1, alpha_counterclockwise, radius);
		const point2_counterclockwise = translate(point2, alpha_counterclockwise, radius);
		const point2_clockwise = translate(point2, alpha_clockwise, radius);
		const point1_clockwise = translate(point1, alpha_clockwise, radius);

		return new Polygon([point1_counterclockwise, point2_counterclockwise, point2_clockwise, point1_clockwise]);
	}

	draw(ctx) {
		this.polygon.draw(ctx);
	}
}