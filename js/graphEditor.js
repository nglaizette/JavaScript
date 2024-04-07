class GraphEditor{
	constructor(canvas, graph){
		this.canvas = canvas;
		this.graph = graph;

		this.ctx = this.canvas.getContext("2d");

		this.selected = null;
		
		this.#addEventListener();
	}

	#addEventListener(){
		this.canvas.addEventListener("mousedown", (evt) => {
			const mousePoint = new Point(evt.offsetX, evt.offsetY);
			this.graph.addPoint(mousePoint);
			this.selected = mousePoint;
		});
	}

	display() {
		this.graph.draw(this.ctx);
		if(this.selected) {
			this.selected.draw(this.ctx, {outline: true});
		}
	}
}