class Polygon {
	constructor(points){
		this.points = points;
		this.segments = [];

		for(let i = 1; i <= points.length; i++){
			this.segments.push(
				new Segment(points[i - 1], points[i % points.length])
			);
		}
	}

	static break(polygon1, polygon2){
		const segment1 = polygon1.segments;
		const segment2 = polygon2.segments;

		const intersections = [];
		for(let i = 0; i  < segment1.length; i++){
			for(let j = 0; j < segment2.length; j++){
				const intersection = getIntersection(
					segment1[i].point1, segment1[i].point2, segment2[j].point1, segment2[j].point2
				);

				if(intersection && intersection.offset !=1 && intersection.offset != 0){
					const point = new Point(intersection.x, intersection.y);
					intersections.push(point);

					// on coupe les segments qui s'intersectent en deux
					// au point d'intersection
					// on les ajoute dans la liste de segments
					let tempPoint = segment1[i].point2;
					segment1[i].point2 =  point
					segment1.splice(i+1, 0, new Segment(point, tempPoint));

					tempPoint = segment2[j].point2;
					segment2[j].point2 =  point
					segment2.splice(j+1, 0, new Segment(point, tempPoint));

				}
			}
		}

		return intersections;
	}

	drawSegments(ctx) {
		for(const segment of this.segments){
			segment.draw(ctx, {color: getRandomColor()});
		}
	}

	draw(ctx, { stroke = "blue", lineWidth = 2, fill="rgba(0, 0, 255, 0.3)" } = {}) {
		ctx.beginPath();
		ctx.fillStyle = fill;
		ctx.strokeStyle = stroke;
		ctx.lineWidth = lineWidth;
		ctx.moveTo(this.points[0].x, this.points[0].y);
		for(let i = 1; i < this.points.length; i++){
			ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		}
}