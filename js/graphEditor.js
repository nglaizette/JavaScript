class GraphEditor{
	constructor(canvas, graph){
		this.canvas = canvas;
		this.graph = graph;

		this.ctx = this.canvas.getContext("2d");

		this.selectedPoint = null;
		this.hoveredPoint = null;
		this.dragging = false;
		
		this.#addEventListener();
	}

	#addEventListener() {
		this.canvas.addEventListener("mousedown", (evt) => {

			if (evt.button == 2 ){ // right click
				if(this.hoveredPoint){
					this.#removePoint(this.hoveredPoint);
				}
			}

			if( evt.button == 0) { // left click
				const mousePoint = new Point(evt.offsetX, evt.offsetY);
				if (this.hoveredPoint) {
					this.selectedPoint = this.hoveredPoint;
					this.dragging = true;
					return;
				}
				this.graph.addPoint(mousePoint);
				this.selectedPoint = mousePoint;
				this.hoveredPoint = mousePoint;
			}
		});

		this.canvas.addEventListener("mousemove", (evt) => {
			const mousePoint = new Point(evt.offsetX, evt.offsetY);
			this.hoveredPoint = getNearestPoint(mousePoint, this.graph.points, 10);

			if(this.dragging) {
				this.selectedPoint.x = mousePoint.x;
				this.selectedPoint.y = mousePoint.y;
			}
		});

		this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
		this.canvas.addEventListener("mouseup", () => this.dragging = false);
	}

	#removePoint(point){
		this.graph.removePoint(point);
		this.hoveredPoint = null;

		if (this.selectedPoint ==  point){
			this.selectedPoint = null;
		}
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