class Graph {

	constructor(points = [], segments = []) {
		this.points = points;
		this.segments =  segments;
	}

	addPoint(point) {
		this.points.push(point);
	}

	containsPoint(point) {
		return this.points.find((p) => p.equals(point));
	}

	tryAddPoint(point) {
		if(!this.containsPoint(point)){
			this.addPoint(point);
			return true;
		}
		return false;
	}

	addSegment(segment) {
		this.segments.push(segment);
	}

	containsSegment(segment){
		return this.segments.find((s) => s.equals(segment));
	}

	tryAddSegment(segment){
		if(!this.containsSegment(segment) && !segment.point1.equals(segment.point2)) {
			this.addSegment(segment);
			return true;
		}
		return false;
	}

	draw(ctx) {
		for (const segment of this.segments) {
			segment.draw(ctx);
		}

		for (const point of this.points) {
			point.draw(ctx);
		}
	}
} 