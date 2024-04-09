class GraphEditor{
	constructor(viewport, graph) {

		this.viewport = viewport;
		this.canvas = viewport.canvas;
		this.graph = graph;

		this.ctx = this.canvas.getContext("2d");

		this.selectedPoint = null;
		this.hoveredPoint = null;
		this.dragging = false;
		this.mousePoint = null;
		
		this.#addEventListener();
	}

	#addEventListener() {
		this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
		this.canvas.addEventListener("mousemove", this.#handleMouveMove.bind(this));

		this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
		this.canvas.addEventListener("mouseup", () => this.dragging = false);
	}

	#handleMouseDown(event) {
		if ( event.button == 2 ){ // right click
			if(this.selectedPoint){
				this.selectedPoint = null;
			} else if (this.hoveredPoint){
				this.#removePoint(this.hoveredPoint);
			}
		}

		if( event.button == 0) { // left click
			if (this.hoveredPoint) {
				this.#select(this.hoveredPoint);
				this.dragging = true;
				return;
			}
			this.graph.addPoint(this.mousePoint);

			this.#select(this.mousePoint);
			this.hoveredPoint = this.mousePoint;
		}
	}

	#handleMouveMove(event) {
		this.mousePoint = this.viewport.getMousePoint(event);
		this.hoveredPoint = getNearestPoint(this.mousePoint, this.graph.points,  this.viewport.zoom * 10);

		if(this.dragging) {
			this.selectedPoint.x = this.mousePoint.x;
			this.selectedPoint.y = this.mousePoint.y;
		}
	}
	#select(point) {
		if(this.selectedPoint){
			this.graph.tryAddSegment(new Segment(this.selectedPoint, point));
		}
		this.selectedPoint = point;
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
			const intentPoint = this.hoveredPoint ? this.hoveredPoint : this.mousePoint;
			new Segment(this.selectedPoint, intentPoint).draw(this.ctx, { dash: [3, 3] });
			this.selectedPoint.draw(this.ctx, { outline: true});
		}
	}
}