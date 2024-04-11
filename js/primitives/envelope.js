class Envelope {
	constructor(skeleton, width, roundness = 30){
		this.skeleton = skeleton;
		this.polygon = this.#generatePolygon(width, roundness);
	}

	#generatePolygon(width, roundness) {
		const { point1, point2} = this.skeleton;
		
		const radius = width / 2;
		const alpha = angle(substract(point1, point2)); // angle entre Point1 et Point2

		const alpha_clockwise = alpha + Math.PI / 2.0;
		const alpha_counterclockwise = alpha - Math.PI / 2.0;

		
		const pointsAroundPoint1 = [];
		const step = Math.PI / Math.max(1, roundness); // pour éviter une division par zéro
		const epsilon = step / 2;
		for(let i = alpha_counterclockwise; i <= alpha_clockwise + epsilon; i += step){
			pointsAroundPoint1.push(translate(point1, i, radius));
		}

		for(let i = alpha_counterclockwise; i <= alpha_clockwise + epsilon; i += step){
			pointsAroundPoint1.push(translate(point2, Math.PI + i, radius));
		}
		return new Polygon(pointsAroundPoint1);
	}

	draw(ctx) {
		this.polygon.draw(ctx);
		this.polygon.drawSegments(ctx);
	}
}