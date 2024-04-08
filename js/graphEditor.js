class GraphEditor{
	constructor(canvas, graph){
		this.canvas = canvas;
		this.graph = graph;

		this.ctx = this.canvas.getContext("2d");

		this.selectedPoint = null;
		this.hoveredPoint = null;
		
		this.#addEventListener();
	}

	#addEventListener() {
		this.canvas.addEventListener("mousedown", (evt) => {
			const mousePoint = new Point(evt.offsetX, evt.offsetY);
			this.hoveredPoint = getNearestPoint(mousePoint, this.graph.points, 10);
			if (this.hoveredPoint) {
				this.selectedPoint = this.hoveredPoint;
				return;
			}
			this.graph.addPoint(mousePoint);
			this.selectedPoint = mousePoint;
		});

		this.canvas.addEventListener("mousemove", (evt) => {
			const mousePoint = new Point(evt.offsetX, evt.offsetY);
			this.hoveredPoint = getNearestPoint(mousePoint, this.graph.points, 10);
		});
	}

	display() {
		this.graph.draw(this.ctx);
		if(this.hoveredPoint) {
			this.hoveredPoint.draw(this.ctx, { fill: true});
		}

		if(this.selectedPoint) {
			this.selectedPoint.draw(this.ctx, { outline: true});
		}
	}
}