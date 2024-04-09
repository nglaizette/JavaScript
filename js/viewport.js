class Viewport {
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.zoom = 1;

		this.#addEventListeners();
	}

	getMousePoint(event) {
		return new Point(
			event.offsetX * this.zoom,
			event.offsetY * this.zoom
		);
	}

	#addEventListeners() {
		this.canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
	}

	#handleMouseWheel(event) {
		const dir = Math.sign(event.deltaY);
		const step = 0.1;
		this.zoom += dir * step;
		this.zoom = Math.max(1, Math.min(5, this.zoom));
		console.log(this.zoom);
	}
}