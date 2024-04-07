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