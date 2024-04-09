class Viewport {
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.zoom = 1;
		this.center = new Point(canvas.width / 2, canvas.height / 2);
		this.offset = scale(this.center, -1);

		this.drag = {
			start: new Point(0, 0),
			end: new Point(0, 0),
			offset: new Point(0, 0),
			active: false
		};

		this.#addEventListeners();
	}

	getMousePoint(event, subtractDragOffset = false) {
		const point = new Point(
			(event.offsetX - this.center.x) * this.zoom - this.offset.x,
			(event.offsetY - this.center.y) * this.zoom - this.offset.y
		);

		return subtractDragOffset ? subsract(point, this.drag.offset) : point;
	}

	getOffset() {
		return add(this.offset, this.drag.offset);
	}

	#addEventListeners() {
		this.canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
		this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
		this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
		this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
	}

	#handleMouseDown(event){
		if(event.button == 1) { // middle button
			this.drag.start = this.getMousePoint(event);
			this.drag.active = true;
		}
	}

	#handleMouseMove(event) {
		if(this.drag.active){
			this.drag.end = this.getMousePoint(event);
			this.drag.offset = subsract(this.drag.end, this.drag.start);
		}
	}

	#handleMouseUp(event) {
		if(this.drag.active){
			this.offset = add(this.offset, this.drag.offset);
			this.drag = {
				start: new Point(0, 0),
				end: new Point(0, 0),
				offset: new Point(0, 0),
				active: false
			}
		}
	}

	#handleMouseWheel(event) {
		const dir = Math.sign(event.deltaY);
		const step = 0.1;
		this.zoom += dir * step;
		this.zoom = Math.max(1, Math.min(5, this.zoom));
		console.log(this.zoom);
	}
}