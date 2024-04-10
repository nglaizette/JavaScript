function getNearestPoint(location, points, threshold = Number.MAX_SAFE_INTEGER) {
	let minDistance = Number.MAX_SAFE_INTEGER;
	let nearestPoint = null;

	for(const point of points) {
		const dist = distance(point, location);
		if (dist < minDistance && dist < threshold) {
			minDistance = dist;
			nearestPoint = point;
		}
	}
	return nearestPoint;
}

function distance(point1, point2) {
	return Math.hypot(point1.x - point2.x, point1.y - point2.y);
}

function add(point1, point2){
	return new Point(point1.x + point2.x, point1.y + point2.y);
}

function substract(point1, point2){
	return new Point(point1.x - point2.x, point1.y - point2.y);
}

function scale(point, scaler){
	return new Point( point.x * scaler, point.y * scaler);
}

function translate(loc, angle, offset) {
	return new Point(
		loc.x + Math.cos(angle) * offset,
		loc.y + Math.sin(angle) * offset
	);
}

function angle(point){
	return Math.atan2(point.y, point.x);
}