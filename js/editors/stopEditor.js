class StopEditor {
	constructor(viewport, world){
		this.viewport = viewport;
		this.world = world;

		this.canvas = viewport.canvas;
		this.ctx = this.canvas.getContext("2d");

		this.mousePoint = null;
		this.intent = null;

		this.markings = world.markings;
	}

	enable() {
		this.#addEventListeners();
	}

	disable() {
		this.#removeEventListeners();
	}

	#addEventListeners() {
		this.boundMouseDownHandleFunction = this.#handleMouseDown.bind(this);
		this.boundMouseMoveHandleFunction = this.#handleMouveMove.bind(this);

		this.boundContextMenu = (evt) => evt.preventDefault();

		this.canvas.addEventListener("mousedown", this.boundMouseDownHandleFunction );
		this.canvas.addEventListener("mousemove", this.boundMouseMoveHandleFunction );

		this.canvas.addEventListener("contextmenu", this.boundContextMenu);
	}

	#removeEventListeners() {
		this.canvas.removeEventListener("mousedown", this.boundMouseDownHandleFunction);
		this.canvas.removeEventListener("mousemove", this.boundMouseMoveHandleFunction);
		this.canvas.removeEventListener("mouseup", this.boundMouseUp);
		this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
	}

	#handleMouveMove(event) {
		this.mousePoint = this.viewport.getMousePoint(event, true);
		let segment = getNearestSegment(
			this.mousePoint, 
			this.world.laneGuides,
			this.viewport.zoom * 10
		);

		if(segment) {
			const projection = segment.projectPoint(this.mousePoint);
			if(projection.offset >= 0 && projection.offset <= 1){
				this.intent = new Stop(
					projection.point,
					segment.directionVector(),
					this.world.roadWidth / 2.0,
					this.world.roadWidth / 2.0
				);
			} else {
				this.intent = null;
			}
		} else {
			this.intent = null;
		}
	}

	#handleMouseDown(event){
		if(event.button == 0) { // left click
			if(this.intent) {
				this.markings.push(this.intent);
				this.intent = null;
			}
		}

		if(event.button == 2) { // right click
			for(let i = 0; i < this.markings.length; i++){
				const polygon = this.markings[i].polygon;
				if(polygon.containsPoint(this.mousePoint)){
					this.markings.splice(i, 1);
					return;
				}
			}
		}
	}

	display(){
		if(this.intent){
			this.intent.draw(this.ctx);
		}
	}
}